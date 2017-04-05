import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './validation.html';

import { CollProductInformation, CollProductPrice, CollProductImprintData, CollProductImage, CollProductShipping, CollProductAdditionalCharges, CollProductVariationPrice } from '../../api/collections.js';
import { Csvfiles } from '../../api/collections.js';

import { CollUploadJobMaster } from '../../api/collections.js';

const fromValidate = "mongo"; // It can be mongo/es(elasticsearch)
let currentRule = 0;
let productData = Array();
let headers = Array();
let CurrentValidation = '';
let currentValidationName = '';
const divNameOfhandsontable = 'productData';
// const esUrl='http:/localhost:9200/pdmrawdata/';
const esUrl = 'http://localhost:9200/pdmrowdata/';
let objHandsontable = null;
let invalidColumnColor = 'red';

import { ProductInformationRules } from '../../../lib/validatorRules/product_information.js';
import { ProductPriceRules } from '../../../lib/validatorRules/product_price.js';
//import { ProductInformationRules } from '../../../lib/validatorRules/product_information.js';
//import { ProductInformationRules } from '../../../lib/validatorRules/product_information.js';
//import { ProductInformationRules } from '../../../lib/validatorRules/product_information.js';
//import { ProductInformationRules } from '../../../lib/validatorRules/product_information.js';



// import  Headers
import { ProductInformationHeaders } from '../../../lib/headers/product_information.js'
import { ProductPriceHeaders } from '../../../lib/headers/product_price.js'
import { ProductImprintDataHeaders } from '../../../lib/headers/product_imprint_data.js'
import { ProductImageHeaders } from '../../../lib/headers/product_images.js'
import { ProductShippingHeaders } from '../../../lib/headers/product_shipping.js'
import { ProductAdditionalChargeHeaders } from '../../../lib/headers/product_additional_charge.js'
import { ProductVariationPricingHeaders } from '../../../lib/headers/product_variation_pricing.js'

let arrHeader = [];

Template.validation.events({
    'click #validation_start' (event) {
        Meteor.validatorFunctions.getCurrentRunningUploadJob();
    },
    'click #proceed_to_next' (event) {
        Meteor.validatorFunctions.proceedToNext();
    }
});
let fileTypes =
[
    { id: 'ProductInformation', name: 'Product Information', isDone: false, isActive: true, header: ProductInformationHeaders, collection: CollProductInformation },
    { id: 'ProductPrice', name: 'Product Pricing', isDone: false, isActive: false, header: ProductPriceHeaders, collection: CollProductPrice },
    { id: 'ProductImprintData', name: 'Imprint Data', isDone: false, isActive: false, header: ProductImprintDataHeaders, collection: CollProductImprintData },
    { id: 'ProductImage', name: 'Image', isDone: false, isActive: false, header: ProductImageHeaders, collection: CollProductImage },
    { id: 'ProductShipping', name: 'Shipping', isDone: false, isActive: false, header: ProductShippingHeaders, collection: CollProductShipping },
    { id: 'ProductAdditionalCharges', name: 'Additional Charges', isDone: false, isActive: false, header: ProductAdditionalChargeHeaders, collection: CollProductAdditionalCharges },
    { id: 'ProductVariationPrice', name: 'Variation Price', isDone: false, isActive: false, header: ProductVariationPricingHeaders, collection: CollProductVariationPrice }
]

Template.validation.onCreated(function() {
    this.filetypes = new ReactiveVar(fileTypes);
    this.jobQueue = new ReactiveVar({});
    //$('#validation_start').click();
    /*
    Meteor.startup(() => {
      //
    });
    */
    setTimeout(function(){
      //jobdata = Template.instance().jobQueue.get();
      CurrentValidation=Meteor.validatorFunctions.startValidation(function(CurrentValidation){
          if(CurrentValidation!='')
          {
            Meteor.validatorFunctions.onClickFindInValidData(CurrentValidation);
          }
      });
    },1000);

});


Template.validation.helpers({
    filetypes() {
        return Template.instance().filetypes.get();
    },
    // This is for fornt-end status display step-2
    jobQueue() {
        let job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
        if(!job)
        {
          return {};
        }
        else {
            //console.log(job);
            let arrFileObj = [];
            job['arrFileObj']=[];
            $.each(Template.instance().filetypes.get(), function(index, value) {
                if(job[value.id])
                {
                  let fileId=Meteor.validatorFunctions.uploadedFileObj(job[value.id].id);
                  fileId['fileType']=value.name;
                  fileId['fileTypeId']=value.id;
                  fileId['validationStatus']=job[value.id].validationStatus;
                  arrFileObj.push(fileId);
                  job['arrFileObj'] = arrFileObj;  //arrFileObj[value.id] = fileId;
                }
            });
            //console.log( job);
            Template.instance().jobQueue.set(job);

            return Template.instance().jobQueue.get();
        }
        //return Meteor.validatorFunctions.getCurrentRunningUploadJob();
    },
    getFileObject(fileId)
    {
      return Meteor.validatorFunctions.uploadedFileObj(fileId);
    },
    isJobAvaialble(job)
    {
        if(job.arrFileObj && job.arrFileObj>0) {
          return true;
        }
        else {
          return false;
        }
    },
    isJobQueueStatusRunning(status)
    {
        //console.log("=========status====",status);
        if(status == "running") {
          return true;
        }
        else {
          return false;
        }
    }
});

Meteor.UploadJob = {

}

Meteor.validatorFunctions = {

    onClickFindInValidData: function(sheetName) {
        if(sheetName=='')
          return false;
        //document.getElementById('validation_start').disabled = true
        //document.getElementById("myProgress").style.display = "block";
        // based on sheet name set Rules
        getHeaders(sheetName, function(err, sheetName) {
            if (err) {
                // display error msg for
                return false;
            }
            let extraRules=eval(sheetName+"Rules");

            findInValidData(sheetName, currentRule, extraRules,arrHeader[sheetName], function(err,sheetName, productData) {
                if (!err) {
                    let extraRules=eval(sheetName+"Rules");
                    //check column avaialble or not
                    let columnName = extraRules[currentRule].validationGroup;
                    // set column highLight column
                    arrHeader[sheetName][(currentRule + 1)].renderer = errorRenderer;
                    renderHandsonTable(sheetName,productData, arrHeader[sheetName], divNameOfhandsontable);
                }
            });
        });
    },
    proceedToNext: function() {

        document.getElementById('validation_start').disabled = false;
        Meteor.validatorFunctions.onClickFindInValidData(CurrentValidation);
        //document.querySelector("#productData").remove();
    },
    getCurrentRunningUploadJob:function(){
      //console.log(Meteor.userId());
      let qry={userId:Meteor.userId(),status:"running","stepStatus":2};
      jobQueue = CollUploadJobMaster.find(qry).fetch();
      //console.log(jobQueue[0]);
      return jobQueue[0];
    },

    uploadedFileObj:function(fileId){
      //console.log(Meteor.userId());
      //let qry={userId:Meteor.userId(),_id:fileId};
      let qry={_id:fileId};
      let fileObj = Csvfiles.find(qry).fetch();
      return fileObj[0];
    },
    setNextValidation:function(sheetName) {

      job = Meteor.validatorFunctions.getCurrentRunningUploadJob();

      // update completed status for current running job
      Meteor.validatorFunctions.setJobQueusSheetStatus(sheetName,job,"completed",function(){
        console.log("===========set Job Queus Sheet Status callback====");
        console.log();
          Meteor.validatorFunctions.startValidation(function(newSheetName){
            console.log("===========newSheetName callback====");
            console.log(newSheetName);
            if(newSheetName!='')
            {
              CurrentValidation=newSheetName;currentRule=0;
              Meteor.validatorFunctions.onClickFindInValidData(newSheetName);
            }
          });
      });
      //console.log("============="+updResult+"==========");

      return false;
    },
    setJobQueusSheetStatus:function(sheetName,job,status,callback){
      let jobStatusField = sheetName+".validationStatus";
      var query = {
          "$set": {
              [jobStatusField]: status
          }
      };
      let guid=job._id;
        console.log("=======guid==========",guid,"::",status);
      let updResult = CollUploadJobMaster.update({_id: guid}, query);

      if(callback)
      {
        callback();
      }
    },
    setJobQueusSheetRuleStatus:function(sheetName,ruleIdx){
      job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
      let jobStatusField = sheetName+".currentRuleIndex";
      var query = {
          "$set": {
              [jobStatusField]: ruleIdx
          }
      };
      let guid=job._id;
        console.log("=======guid==========",guid,"::",status);
      let updResult = CollUploadJobMaster.update({_id: guid}, query);
    },
    updateJobQueueMainStatus:function(job){
      let guid=job._id;
      var query = {
          "$set": {
              status: "completed"
          }
      };
      let updResult = CollUploadJobMaster.update({_id: guid}, query);
    },
    startValidation:function(callback){
        job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
        console.log(job);
        if(!job)
        {
          return "";
        }
        else {
            let arrFileObj = [];
            job['arrFileObj']=[];

            $.each(fileTypes, function(index, value) {
                //console.log(value.id);
                if(job[value.id])
                {
                  let fileId=Meteor.validatorFunctions.uploadedFileObj(job[value.id].id);
                  fileId['fileTypeId']=value.id;
                  arrFileObj.push(fileId);
                  job['arrFileObj'] = arrFileObj;  //arrFileObj[value.id] = fileId;
                }
            });

            console.log(job.arrFileObj);
            let allCompletedflag=1;
            $.each(job.arrFileObj , function(index, value) {
                console.log("=====Status==="+job[value.fileTypeId].validationStatus);
                if(job[value.fileTypeId].validationStatus=="running")
                {
                  CurrentValidation=value.fileTypeId;
                  allCompletedflag=0;
                  return false;
                }
                else if(job[value.fileTypeId].validationStatus=="panding")
                {
                  // update completed status for current running job
                  Meteor.validatorFunctions.setJobQueusSheetStatus(value.fileTypeId,job,"running");
                  if(CurrentValidation=="")
                  {
                    CurrentValidation=value.fileTypeId;
                  }
                  allCompletedflag=0;
                  return false;
                }
            });

            // there is no running and panding status then job will be completed
            if(allCompletedflag==1)
            {
              Meteor.validatorFunctions.updateJobQueueMainStatus(job);
              CurrentValidation='';
            }
        }
        if(callback)
        {
          callback(CurrentValidation);
        }
        return CurrentValidation;
    }
}


function findjobQueueData() {
    //console.log(currentRuleIdx,"===========",arrRules.length);
    let query = {sku:""};
    console.log(query);
    let result = CollProductInformation.find(query).fetch();
    console.log(result);

}

// display error msg hide/show
function displayErrorMsg(flag, msg) {
    var errorMsg = $("#errorDiv").find("#errorStr");
    errorMsg.html(msg);
    document.getElementById("mydiv").style.display = !flag ? "none" : "block";
    document.getElementById("errorDiv").style.display = !flag ? "none" : "block";
    document.getElementById("buttonDivProceed").style.display = !flag ? "none" : "block";
}

let errorRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = invalidColumnColor;
};

function renderHandsonTable(sheetName,dataObject, headers, eleName) {
    //console.log(headers);
    let hotSettings = {
        data: dataObject,
        columns: arrHeader[sheetName],
      //  stretchH: 'all',
        //width: '100%',
        autoWrapRow: true,
        height: 200,
        //maxRows: 22,
        rowHeaders: true,
        colHeaders: getHeadersValues(arrHeader[sheetName]),
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

    let dataResult = eval("Coll"+currentValidationName).update({
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
    //console.log("getHeaders_Call",arrHeader[sheetName]);
    if (arrHeader[sheetName] && arrHeader[sheetName].length > 0) {
        callbackHeaderName(null, sheetName);
        return true;
    } else {
        productMapping = setColumnHeader(sheetName, eval(sheetName+"Headers"));
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
function setColumnHeader(sheetName, sheetHeaders) {
    let appendString = '';
    if (fromValidate == 'es') {
        appendString = "_source.";
    }
    if (sheetHeaders) {
        //console.log(arrHeader[sheetName]);
        if(!arrHeader[sheetName])
        {
          arrHeader[sheetName]=[];
        }
        arrHeader[sheetName].push({ colHeaders: "guid", type: 'text', data: '_id' });
        $.each(sheetHeaders, function(index, value) {
            arrHeader[sheetName].push({ colHeaders: "" + value.column, type: value.type, data: appendString + value.column });
        });
    }
}

function getHeadersValues(arrColumnHeader) {
    // this function extract only column value
    return arrColumnHeader.map(function(a) { return a.colHeaders; })
}


function findInValidData(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback) {
    console.log(currentRuleIdx, "====1=======", arrRules.length,"=========",sheetName);
    currentValidationName=sheetName;
    if (arrRules.length <= currentRuleIdx) {
        displayErrorMsg(false, '');

        Meteor.validatorFunctions.setNextValidation(sheetName,currentRuleIdx);
        //document.getElementById("validation_successful").style.display = "block";
        // all rules are completed
        return false;
    }
    delete(sheetHeaders[(currentRule + 1)].renderer);
    if (fromValidate == 'mongo') {
        findInvalidDataFromMongo(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback);
    } else {
        findInvalidDataFromES(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback);
    }

}

function findInvalidDataFromMongo(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback) {
    //console.log(currentRuleIdx,"===========",arrRules.length);
    let query = arrRules[currentRuleIdx].qryMongo;
    console.log(query);
    let result = eval("Coll"+sheetName).find(query).fetch();
    if (result.length <= 0) {
        // continue checking with next set of rules
        currentRule = ++currentRuleIdx;
        Meteor.validatorFunctions.setJobQueusSheetRuleStatus(sheetName,currentRule);
        setValidationProgress(sheetName,currentRuleIdx, arrRules.length);
        findInValidData(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback);
    } else {
        //console.log(result);
        displayErrorMsg(true, arrRules[currentRuleIdx].errorString);
        result = result.map(function(a) { return a; });
        callback(null,sheetName, result,sheetHeaders);
    }
}

function setValidationProgress(sheetName,currentRuleIdx, ProductInformationLength) {

    let elem = document.getElementById("myBar");
    let width = Math.round(currentRuleIdx / ProductInformationLength * 100);
    elem.style.width = width + '%';
    elem.innerHTML = width * 1 + '%';
    //alert(width);
    job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
    console.log(job[sheetName].id);
    Csvfiles.update(job[sheetName].id, {
            $set: { 'validationProgress': width }
        },
        // function(e, res) {
        //     if (progress < 100)
        //         streamer.resume();
        //     else
        //         streamer.abort()
        // }
    );
    /*
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
    */
}


function findInvalidDataFromES(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback) {
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
                Meteor.validatorFunctions.setJobQueusSheetRuleStatus(sheetName,currentRule);
                // continue checking with next set of rules
                currentRule = ++currentRuleIdx;

                setValidationProgress(sheetName,currentRuleIdx, arrRules.length);

                console.log(currentRuleIdx);

                if (currentRuleIdx >= arrRules.length) {
                    document.getElementById("validation_successful").style.display = "block";
                } else {

                    findInValidData(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback);
                }

                return false;
            } else // found some records that have invalid data
            //alert(23);
                displayErrorMsg(true, arrRules[currentRuleIdx].errorString);

            callback(null,sheetName, data.hits.hits,sheetHeaders);
        },
        error: function(data) {
            // should be only one item in hits
            callback(data.hits.hits,sheetName,null,sheetHeaders);
        }
    });
}
