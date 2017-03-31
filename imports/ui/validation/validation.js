import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './validation.html';

import { CollProductInformation, CollProductPricing, CollProductImprintData, CollProductImage, CollProductShipping, CollProductAdditionalCharges, CollProductVariationPrice } from '../../api/collections.js';
import { Csvfiles } from '../../api/collections.js';

const fromValidate = "mongo"; // It can be mongo/es(elasticsearch)
let currentRule = 0;
let productData = Array();
let headers = Array();
const divNameOfhandsontable = 'productData';
// const esUrl='http:/localhost:9200/pdmrawdata/';
const esUrl = 'http://localhost:9200/pdmrowdata/';
let objHandsontable = null;
let invalidColumnColor = 'red';

import { ProductInformationRules } from '../../../lib/validatorRules/product_information.js';

// import  Headers
import { ProductInformationHeaders } from '../../../lib/headers/product_information.js'
import { ProductPriceHeaders } from '../../../lib/headers/product_price.js'
import { ProductImprintDataHeaders } from '../../../lib/headers/product_imprint_data.js'
import { ProductImageHeaders } from '../../../lib/headers/product_images.js'
import { ProductShippingHeaders } from '../../../lib/headers/product_shipping.js'
import { ProductAdditionalChargeHeaders } from '../../../lib/headers/product_additional_charge.js'
import { ProductVariationPricingHeaders } from '../../../lib/headers/product_variation_pricing.js'


Template.validation.events({
    'click #validation_start' (event) {
        Meteor.validatorFunctions.onClickFindInValidData('product_information');
    },
    'click #proceed_to_next' (event) {
        Meteor.validatorFunctions.proceedToNext();
    }
});

Template.validation.onCreated(function() {
    this.filetypes = new ReactiveVar(
        [
            { id: 'ProductInformation', name: 'Product Information', isDone: false, isActive: true, header: ProductInformationHeaders, collection: CollProductInformation },
            { id: 'ProductPricing', name: 'Product Pricing', isDone: false, isActive: false, header: ProductPriceHeaders, collection: CollProductPricing },
            { id: 'ProductImprintData', name: 'Imprint Data', isDone: false, isActive: false, header: ProductImprintDataHeaders, collection: CollProductImprintData },
            { id: 'ProductImage', name: 'Image', isDone: false, isActive: false, header: ProductImageHeaders, collection: CollProductImage },
            { id: 'ProductShipping', name: 'Shipping', isDone: false, isActive: false, header: ProductShippingHeaders, collection: CollProductShipping },
            { id: 'ProductAdditionalCharges', name: 'Additional Charges', isDone: false, isActive: false, header: ProductAdditionalChargeHeaders, collection: CollProductAdditionalCharges },
            { id: 'ProductVariationPrice', name: 'Variation Price', isDone: false, isActive: false, header: ProductVariationPricingHeaders, collection: CollProductVariationPrice }
        ]
    );
});

Template.validation.helpers({
    filetypes() {
        return Template.instance().filetypes.get();
    }
});



Meteor.validatorFunctions = {

    onClickFindInValidData: function(sheetName) {
        document.getElementById('validation_start').disabled = true
        document.getElementById("myProgress").style.display = "block";
        // based on sheet name set Rules
        getHeaders(sheetName, function(err, sheetName) {
            if (err) {
                // display error msg for
                return false;
            }
            findInValidData(sheetName, currentRule, ProductInformationRules, function(err, productData) {
                if (!err) {
                    //check column avaialble or not
                    let columnName = ProductInformationRules[currentRule].validationGroup;
                    // set column highLight column
                    headers[(currentRule + 1)].renderer = errorRenderer;
                    renderHandsonTable(productData, headers, divNameOfhandsontable);
                }
            });
        });
    },
    proceedToNext: function() {

        document.getElementById('validation_start').disabled = false;
        Meteor.validatorFunctions.onClickFindInValidData('product_information');
        //document.querySelector("#productData").remove();
    }

}

// display error msg hide/show
function displayErrorMsg(flag, msg) {
    var errorMsg = $("#errorDiv").find(".errorString");
    errorMsg.html(msg);
    document.getElementById("mydiv").style.display = !flag ? "none" : "block";
    document.getElementById("errorDiv").style.display = !flag ? "none" : "block";
    document.getElementById("buttonDivProceed").style.display = !flag ? "none" : "block";
}

let errorRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = invalidColumnColor;
};

function renderHandsonTable(dataObject, headers, eleName) {
    console.log(headers);
    let hotSettings = {
        data: dataObject,
        columns: headers,
        stretchH: 'all',
        //width: '100%',
        autoWrapRow: true,
        height: 200,
        //maxRows: 22,
        rowHeaders: true,
        colHeaders: getHeadersValues(headers),
        afterChange: function(changes, source) {
            updateProductData(changes, source);
        }
    };
    hotElement = document.querySelector('#' + eleName)
    objHandsontable = new Handsontable(hotElement, hotSettings);
}

function updateProductData(changes, source) {
    if (!changes) {
        return;
    }
    var cellChange = {
        'rowIndex': changes[0][0],
        'columnIndex': changes[0][1],
        'oldValue': changes[0][2],
        'newValue': changes[0][3]
    };
    if (cellChange.oldValue != cellChange.newValue) {
        var _id = objHandsontable.getDataAtCell(cellChange.rowIndex, 0);
        var column_name = cellChange.columnIndex.split(".").pop();
        updateData(_id, column_name, cellChange.newValue);
    }
}

function updateData(guid, columnName, newValue) {
    if (fromValidate == 'mongo') {
        updateDataMongo(guid, columnName, newValue);
    } else {
        updateDataES(guid, columnName, newValue)
    }
}

function updateDataMongo(guid, columnName, newValue) {
    let setVal = {};
    var query = {
        "$set": {
            [columnName]: newValue
        }
    };
    //  console.log(query);

    let dataResult = CollProductInformation.update({
        _id: guid
    }, query, { validate: false, validationContext: "updateForm" }, function(error, res) {
        if (error) {
            //  console.log("======error update====");
            //  console.error(error.message);
            //  console.error(error.invalidKeys);

            // Prepare Simple Schema validation msg
            let strMsg = error.message + ". Please provide valid value";
            displayErrorMsg(true, strMsg);
        } else {
            console.log("======result update====");
            //console.error(res);
        }
    });
    document.getElementById("buttonDivProceed").style.display = "block";
}

function updateDataES(guid, columnName, newValue) {
    var query = {
        "doc": {
            [columnName]: newValue
        }
    };
    $.ajax({
        async: false, // set async false to wait for previous response
        url: esUrl + "product/" + guid + "/_update",
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(newDataQuery) + '\n',
        success: function(data) {
            //console.log(data);
            document.getElementById("buttonDivProceed").style.display = "block";
            alert(" updated successfully ");
            document.getElementById("buttonDivProceed").style.display = "block";
        },
        error: function(err) {
                console.log(err);
            }
            //data: query
    });
}

function getHeaders(sheetName, callbackHeaderName) {
    if (headers.length > 0) {
        callbackHeaderName(null, sheetName);
        return true;
    } else {
        productMapping = setColumnHeader(sheetName, ProductInformationHeaders);
        callbackHeaderName(null, sheetName);
    }
    /*
    if(headers.length>0)
    {
      callbackHeaderName(null,sheetName);
      return true;
    }
    $.ajax({
      url: esUrl+"product/_mapping",
      type: 'get',
      dataType: 'json',
      success: function(data) {
          //alert("Success");
          setColumnHeader(sheetName,data);
          callbackHeaderName(null,sheetName);
      },
      error: function(data) {
          // should be only one item in hits
      }
    });
    */
}

// function setColumnHeader(sheetName,productMapping)
// {
//     if(productMapping.pdmrawdata.mappings.product.properties)
//     {
//       headers.push({colHeaders:"guid",type:'text',data:'_id'});
//       $.each(productMapping.pdmrawdata.mappings.product.properties, function(index, value) {
//         headers.push({colHeaders:""+index,type:value.type,data:'_source.'+index});
//       });
//     }
// }
function setColumnHeader(sheetName, productMapping) {
    let appendString = '';
    if (fromValidate == 'es') {
        appendString = "_source.";
    }
    if (ProductInformationHeaders) {
        headers.push({ colHeaders: "guid", type: 'text', data: '_id' });
        $.each(ProductInformationHeaders, function(index, value) {
            headers.push({ colHeaders: "" + value.column, type: value.type, data: appendString + value.column });
        });
    }
}

function getHeadersValues(arrColumnHeader) {
    // this function extract only column value
    return arrColumnHeader.map(function(a) { return a.colHeaders; })
}


function findInValidData(sheetName, currentRuleIdx, arrRules, callback) {
    console.log(currentRuleIdx, "====1=======", arrRules.length);
    if (arrRules.length <= currentRuleIdx) {
        displayErrorMsg(false, '');
        document.getElementById("validation_successful").style.display = "block";
        // all rules are completed
        return false;
    }
    delete(headers[(currentRule + 1)].renderer);
    if (fromValidate == 'mongo') {
        findInvalidDataFromMongo(sheetName, currentRuleIdx, arrRules, callback);
    } else {
        findInvalidDataFromES(sheetName, currentRuleIdx, arrRules, callback);
    }

}

function findInvalidDataFromMongo(sheetName, currentRuleIdx, arrRules, callback) {
    //console.log(currentRuleIdx,"===========",arrRules.length);
    let query = arrRules[currentRuleIdx].qryMongo;
    console.log(query);
    let result = CollProductInformation.find(query).fetch();
    if (result.length <= 0) {
        // continue checking with next set of rules
        currentRule = ++currentRuleIdx;
        setValidationProgress(currentRuleIdx, arrRules.length);
        findInValidData(sheetName, currentRuleIdx, arrRules, callback);
    } else {
        //console.log(result);
        displayErrorMsg(true, arrRules[currentRuleIdx].errorString);
        result = result.map(function(a) { return a; });
        callback(null, result);
    }
}

function setValidationProgress(currentRuleIdx, ProductInformationLength) {
    let elem = document.getElementById("myBar");
    let width = Math.round(currentRuleIdx / ProductInformationLength * 100);
    elem.style.width = width + '%';
    elem.innerHTML = width * 1 + '%';
    //alert(width);
    Meteor.call('products.insertCSVData', 'iZrfNK4XoCsxGPhA3', function() {
        //insertCSVData(fileID, results.data, function(err, res) {
        // update file progress
        Csvfiles.update('iZrfNK4XoCsxGPhA3', {
                $set: { 'validationProgress': width }
            },
            // function(e, res) {
            //     if (progress < 100)
            //         streamer.resume();
            //     else
            //         streamer.abort()
            // }
        );
    });
}


function findInvalidDataFromES(sheetName, currentRuleIdx, arrRules, callback) {
    // Find unValid Data
    $.ajax({
        url: esUrl + "product/_search",
        type: 'post',
        data: JSON.stringify(arrRules[currentRule].fn()) + "\n",
        dataType: 'json',
        success: function(data) {

            //when no more in valid data rule will be changed
            if (data.hits.hits.length == 0) // if no errors found
            {
                // continue checking with next set of rules
                currentRule = ++currentRuleIdx;

                setValidationProgress(currentRuleIdx, arrRules.length);

                console.log(currentRuleIdx);

                if (currentRuleIdx >= arrRules.length) {
                    document.getElementById("validation_successful").style.display = "block";
                } else {

                    findInValidData(sheetName, currentRuleIdx, arrRules, callback);
                }

                return false;
            } else // found some records that have invalid data
            //alert(23);
                displayErrorMsg(true, arrRules[currentRuleIdx].errorString);

            callback(null, data.hits.hits);
        },
        error: function(data) {
            // should be only one item in hits
            callback(data.hits.hits, null);
        }
    });
}