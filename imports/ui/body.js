import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

// import  Headers
import { ProductInformationHeaders } from '../../lib/headers/product_information.js'
import { ProductPriceHeaders } from '../../lib/headers/product_price.js'
import { ProductImprintDataHeaders } from '../../lib/headers/product_imprint_data.js'
import { ProductImageHeaders } from '../../lib/headers/product_images.js'
import { ProductShippingHeaders } from '../../lib/headers/product_shipping.js'
import { ProductAdditionalChargeHeaders } from '../../lib/headers/product_additional_charge.js'
import { ProductVariationPricingHeaders } from '../../lib/headers/product_variation_pricing.js'


// import  collections

import { CollProductInformation, CollProductPricing, CollProductImprintData, CollProductImage, CollProductShipping, CollProductAdditionalCharges, CollProductVariationPrice } from '../api/collections.js';
import { Csvfiles } from '../api/collections.js';
import { Csvfilemapping } from '../api/collections.js';


import './body.html';

let abortChecked = false;
let editor;
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('lll');
});

Template.readCSV.events({
    "click #btnSaveCustomjavascript": function(event, template) {
        var code = editor.getValue();
        let $selectedDom = $(template.find("a[data-target='#javascripEditorModal'].open"));
        let selectedheader = $selectedDom.attr('data-header');
        $selectedDom.attr('data-code', code);
        $('#javascripEditorModal').modal('hide');

        $(template.find('#preview')).find('.spinner').show();
        let mapping = generateMapping(template); // generate new Mapping
        // generate Preview
        generatePreview(template.find('#csv-file').files[0], template, mapping, function() {
            let ft = template.filetypes.get(); // all file type
            let activeFiletypeId = _.find(ft, function(d) { return d.isActive }).id;
            insertCSVMapping(activeFiletypeId, mapping, function(e, res) {
                $(template.find('#preview')).find('.spinner').hide();
            });
        });
    },
    "click a[data-target='#javascripEditorModal']": function(event, template) {
        var currentEl = event.currentTarget;
        $(currentEl).addClass('open');
        setTimeout(function() {
            if (editor == undefined) {
                editor = CodeMirror.fromTextArea(template.find("#customJavascript"), {
                    lineNumbers: true,
                    mode: "javascript" // set any of supported language modes here
                });
            }
            //editor.setValue();
            let _val = $(currentEl).attr('data-code').toString();
            editor.setValue(_val);
            editor.refresh();
        }, 200);
    },
    "change #csv-file": function(event, template) {
        // Display an error toast, with a title

        let _files = [];
        abortChecked = false;

        for (let i = 0; i < template.find('#csv-file').files.length; i++) {
            let regex = new RegExp("(.*?)\.(csv)$");
            if ((regex.test(template.find('#csv-file').files[i].name))) {
                // view file progress
                let existFiles = template.files.get();
                existFiles.splice(0, 0, { name: template.find('#csv-file').files[i].name, progress: 0, mapping: true });
                template.files.set(existFiles);

                _files.push(template.find('#csv-file').files[i]);
            }
        }
        Papa.LocalChunkSize = 1000000; // 1000kb
        for (let i = 0; i < _files.length; i++) {

            $(template.find("#upload-csv-zone")).addClass('onprogress');

            //template.find("#mapping").style.display = 'block';
            getHeader(_files[i], template, function() {
                generateXEditor(template, function() { // generate x-editor
                    //$(template.find("#mapping")).find('.spinner').hide();

                    let mapping = generateMapping(template); // generate new Mapping

                    //$(template.find('#btnPreview')).find('.progress-inner').css({ width: '45%' });
                    // generate Preview
                    generatePreview(template.find('#csv-file').files[0], template, mapping, function() {
                        //template.find('#btnPreview').children[1].children[0].style.width = '100%';
                        //template.find("#mapping").style.display = 'none';
                        $(template.find("#preview")).show();
                        $(template.find("#upload-csv-zone")).hide();
                        //$(template.find('#btnPreview')).find('.progress-inner').css({ width: '0%' });
                        $(template.find("#mapping")).show();
                        $(template.find("#upload-csv-zone")).removeClass('onprogress');
                    });
                });
            });
            //parseCSV(_files[i], template); // parse csv to json using papa parse
        }
    },
    "click #btnPreview": function(event, template) {

        // insert csv maaping in db

        // // let ft = template.filetypes.get(); // all file type
        // // let activeFiletypeId = _.find(ft, function(d) { return d.isActive }).id;
        // // insertCSVMapping(activeFiletypeId, mapping, function(e, res) {});

        //console.log('mapping', mapping);

    },
    "change #hasheader": function(event, template) {
        $(template.find('#mapping')).find('.spinner').show();
        getHeader(template.find('#csv-file').files[0], template, function() {
            generateXEditor(template, function() { // generate x-editor
                $(template.find('#mapping')).find('.spinner').hide();
                $(template.find('#preview')).find('.spinner').show();
                setTimeout(function() {
                    let mapping = generateMapping(template); // generate new Mapping
                    // generate Preview
                    generatePreview(template.find('#csv-file').files[0], template, mapping, function() {
                        $(template.find('#preview')).find('.spinner').hide();
                    });
                }, 1000);
            });
        });
    },
    'click #btnNext': function(event, template) {

        $(template.find('#btnNext')).addClass('inProgress');

        $(template.find('#mapping')).hide();
        $(template.find('#btnAbort')).show();
        let mapping = generateMapping(template); // generate new Mapping

        // insert csv maaping in db

        let ft = template.filetypes.get(); // all file type
        let activeFiletypeId = _.find(ft, function(d) { return d.isActive }).id;
        insertCSVMapping(activeFiletypeId, mapping, function(e, res) {
            // upload csv file in db
            parseCSV(template.find('#csv-file').files[0], template, mapping, function() {
                resetAll(template);
            });
        });
    },
    'click #btnAbort': function(event, template) {
        abortChecked = true;
        resetAll(template);
    }
});

let generateMapping = function(template) {
    // get new mapping
    let mapping = [];
    let activefile = template.headers.get(); // get active file type data

    // create mapping
    activefile.forEach(function(result, index) {
        mapping.push({
            sysHeader: $(template.find('#dpdsysheader_' + index)).attr('data-column'),
            csvHeader: template.find('#dpdcsvheader_' + index).innerHTML,
            transform: $(template.find('#txtCustomJavascript_' + index)).attr('data-code'),
            //datatype: template.find('#dpddatatype_' + index).innerHTML,
        })
    });
    return mapping;
}

let generateXEditor = function(template, cb) {
    let activefile = template.headers.get(); // get active file type data
    let _csvHeader = template.csvHeaders.get();
    let _dataTypes = template.dataTypes.get();
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    //console.log('dataTypes', _dataTypes);
    //console.log('csvHeader', _csvHeader);
    // create mapping

    let ft = template.filetypes.get(); // all file type
    let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype
    let existMapping = Csvfilemapping.findOne({ owner: Meteor.userId(), fileTypeID: activeFiletype.id });
    activefile.forEach(function(result, index) {
        let _val;
        let _datatype = result.type;
        if (_hasHeader) {
            _val = getHeaderDistance(result.column, _csvHeader);
        } else {
            _val = _csvHeader[index]
        }

        $(template.find('#dpdcsvheader_' + index)).editable("destroy");
        $(template.find('#dpdcsvheader_' + index)).editable({
            value: _val.toLowerCase(),
            source: _csvHeader,
            success: function(response, newValue) {
                //console.log('success');
                $(template.find('#preview')).find('.spinner').show();
                setTimeout(function() {
                    let mapping = generateMapping(template); // generate new Mapping
                    generatePreview(template.find('#csv-file').files[0], template, mapping, function() {
                        $(template.find('#preview')).find('.spinner').hide();
                    });
                }, (500));
            }
        });
        $(template.find('#dpdcsvheader_' + index)).editable('setValue', _val.toLowerCase());

        if (existMapping != undefined) {
            $(template.find('#txtCustomJavascript_' + index)).attr('data-code', existMapping.mapping[index].transform);
        }
        // $(template.find('#dpddatatype_' + index)).editable({
        //     value: _datatype.toLowerCase(),
        //     source: _dataTypes
        // });
        // $(template.find('#dpddatatype_' + index)).editable('setValue', _datatype.toLowerCase())
    });
    cb();
}

let resetAll = function(template) {
    $(template.find('#csv-file')).val('');
    template.find("#mapping").style.display = 'none';
    template.find("#preview").style.display = 'none';
    //$(template.find('#btnPreview')).show();
    //template.find('#btnPreview').children[1].children[0].style.width = '0%';
    template.find('#btnNext').children[1].children[0].style.width = '0%';
    $(template.find('#btnNext')).removeClass('inProgress');
    $(template.find("#upload-csv-zone")).show();
    template.find('#btnNext').children[0].innerHTML = 'Proceed';
    $(template.find('#btnNext')).show();
    $(template.find('#btnAbort')).hide();
    $(template.find("#handson-Zone-during-upload")).hide();
    toastr.clear();

    // destroyXEditor

    //let activefile = template.headers.get(); // get active file type data
    //let _csvHeader = template.csvHeaders.get();
    //let _dataTypes = template.dataTypes.get();

    //console.log('dataTypes', _dataTypes);
    //console.log('csvHeader', _csvHeader);
    // create mapping
    //activefile.forEach(function(result, index) {
    //    let _val = getHeaderDistance(result.column, _csvHeader);
    //    $(template.find('#dpdcsvheader_' + index)).editable("destroy");
    //    //$(template.find('#dpddatatype_' + index)).editable("destroy");
    //});
}

let getHeaderDistance = function(sysColumn, csvHeaders) {
    let res = csvHeaders[0];
    // console.log(this.csvHeaders);
    let col = sysColumn;
    csvHeaders.forEach(function(d) {
        res = Levenshtein.get(col, d) < Levenshtein.get(col, res) ? d : res;
    });
    return res;
}

let insertCSVMapping = function(fileTypeID, mapping, cb) {


    let isExist = Csvfilemapping.findOne({ owner: Meteor.userId(), fileTypeID: fileTypeID });
    if (isExist == undefined) {
        let _data = {
            mapping: mapping,
            fileTypeID: fileTypeID,
            createdAt: new Date(),
            updateAt: new Date(),
            deleteAt: null,
            owner: Meteor.userId(),
            username: Meteor.user().username
        };
        Csvfilemapping.insert(_data, function(e, res) {
            cb(e, res);
        });
    } else {
        let _data = {
            mapping: mapping,
            updateAt: new Date()
        };
        Csvfilemapping.update(isExist._id, { $set: _data }, function(e, res) {
            cb(e, res);
        });
    }
}

// Return array of string values, or NULL if CSV string not well formed.
let CSVtoArray = function(text) {
    let p = '',
        row = [''],
        ret = [row],
        i = 0,
        r = 0,
        s = !0,
        l;
    for (l in text) {
        l = text[l];
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = ''];
            i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret.slice(0, ret.length - 1);
};

let arrayToCSV = function(row) {
    for (let i in row) {
        for (let j in row[i]) {
            row[i][j] = "\"" + row[i][j] + "\"";
        }
        row[i] = row[i].join(',');
    }
    return row.join('\n');
}

let getHeader = function(_file, template, cb) {
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    Papa.parse(_file, {
        header: _hasHeader,
        dynamicTyping: true,
        encoding: "UTF-8",
        skipEmptyLines: true,
        beforeFirstChunk: function(chunk) {
            let rows = CSVtoArray(chunk);
            let headings = rows[0]; //rows[0].map(v => v.toLowerCase());
            if (!_hasHeader) {
                let newHeaders = [];
                headings.forEach(function(result, index) {
                    newHeaders.push('header' + (index + 1));
                });
                template.csvHeaders.set(newHeaders);
            } else {
                template.csvHeaders.set(headings);
            }
        },
        complete: function(results) {
            //console.log('results', results);
        },
        error: function(error, f) {
            console.log("ERROR:", error, f);
        },
        chunk: function(results, streamer) {
            streamer.abort();
            cb();
        }
    });
};

let getTransformVal = function(headings, row, transformStr, oldValue, index) {
    try {
        let code = transformStr;
        _.each(headings, function(d, index) {
            row[d] = row[index];
        });
        row['_id'] = index;
        let result = new Function("row", code).call(this, row);
        return result;
    } catch (e) {
        return oldValue;
    }
}

let generateDatawithNewHeader = function(chunk, _hasHeader, mapping, template) {
    let rows = CSVtoArray(chunk);
    let headings = template.csvHeaders.get(); //  _.extend([], rows[0]);
    let oldRows = CSVtoArray(chunk);
    let extraHeaders = _.reject(headings, function(d) { return _.indexOf(_.map(mapping, function(v) { return v.csvHeader }), d) != -1 })
    let newHeading = _.union(_.map(mapping, function(v) { return v.sysHeader }), extraHeaders);
    _.each(newHeading, function(d, inx) {
        let map = _.find(mapping, function(v) { return v.sysHeader == d });
        let oldHeading_index = -1;
        if (map != undefined) {
            oldHeading_index = _.indexOf(headings, map.csvHeader.trim());
        } else {
            oldHeading_index = _.indexOf(headings, d.trim());
        }
        for (let i = _hasHeader ? 1 : 0; i < oldRows.length; i++) {
            if (map != undefined) {
                if (map.transform.trim() != '') {
                    rows[i][inx] = getTransformVal(headings, oldRows[i], map.transform.trim(), oldRows[i][oldHeading_index], i);
                } else {
                    rows[i][inx] = oldRows[i][oldHeading_index];
                }
            } else {
                rows[i][inx] = oldRows[i][oldHeading_index];
            }
        }
        if (_hasHeader)
            rows[0][inx] = d.trim();
    });

    return (!_hasHeader ? (newHeading.join(',') + '\n') : "") + arrayToCSV(rows);
}

let generatePreview = function(_file, template, mapping, cb) {
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    Papa.parse(_file, {
        header: true,
        dynamicTyping: true,
        encoding: "UTF-8",
        skipEmptyLines: true,
        beforeFirstChunk: function(chunk) {
            return generateDatawithNewHeader(chunk, _hasHeader, mapping, template);
        },
        complete: function(results) {
            //console.log('results', results);

        },
        error: function(error, f) {
            console.log("ERROR:", error, f);
        },
        chunk: function(results, streamer) {
            template.previewRec.set(results.data.slice(0, 5));
            streamer.abort();
            cb();
            return;
        }
    });
};

let setNextFile = function(template) {
    let ft = template.filetypes.get(); // all file type

    let activeFiletypeId = _.indexOf(ft, _.find(ft, function(d) { return d.isActive }));

    ft[activeFiletypeId].isActive = false;
    ft[activeFiletypeId].isDone = true;
    ft[activeFiletypeId + 1].isActive = true;

    template.filetypes.set(ft);
}

let parseCSV = function(_file, template, mapping, cb) {
    //$("#btnPreview").hide();
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    $(template.find('#btnNext')).find('.progress-inner').css({ 'width': '0%' });
    $(template.find('#btnNext')).find('.content').text('Start uploding...');
    let file = {
        name: _file.name,
        size: _file.size,
        progress: 0,
        totalNoOfRecords: 0,
        uploadedRecords: 0,
        createdAt: new Date(),
        updateAt: new Date(),
        deleteAt: '',
        owner: Meteor.userId(),
        username: Meteor.user().username
    };

    Csvfiles.insert(file, function(e, res) {
        $('#buttonProceedNext').hide();
        let fileID = res; // new file id
        //console.log('fileID', fileID);
        let chunks = 1;
        let totalRecords = 0;
        let uploadedRecords = 0;
        let progress = 0;
        Papa.parse(_file, {
            header: true,
            dynamicTyping: true,
            encoding: "UTF-8",
            skipEmptyLines: true,
            complete: function(results) {
                console.log('complate results', results);
                if (!abortChecked) {
                    setNextFile(template);
                }
                cb();
            },
            error: function(error, f) {
                console.log("ERROR:", error, f);
            },
            step: function(results, parser) {
                //console.log("Row:", results);
                if (abortChecked) {
                    parser.abort();
                    return;
                }
                parser.pause();
                let ft = template.filetypes.get(); // all file type
                let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype
                insertCSVData(results.data[0], fileID, activeFiletype.collection, function() {

                    //$("#errMessageFromSchema").text('');
                    toastr.clear();

                    // calculate progress
                    ++uploadedRecords;
                    let newProgress = Math.round((uploadedRecords * 100) / totalRecords);
                    if (progress == newProgress) { parser.resume(); } else {
                        $(template.find('#btnNext')).find('.progress-inner').css({ 'width': newProgress + '%' })
                        $(template.find('#btnNext')).find('.content').text(newProgress + '% completed');

                        $(template.find('#buttonProceedNext')).find('.progress-inner').css({ 'width': newProgress + '%' })
                        $(template.find('#buttonProceedNext')).find('.content').text(newProgress + '% completed');
                        Csvfiles.update(fileID, { $set: { progress: newProgress, uploadedRecords: uploadedRecords } }, function(e, res) {
                            parser.resume();
                        });
                    }
                });
            },
            beforeFirstChunk: function(chunk) {
                let rows = CSVtoArray(chunk);
                totalRecords = (_hasHeader) ? rows.length - 1 : rows.length - 0; // last row getting empty
                Csvfiles.update(fileID, { $set: { totalNoOfRecords: totalRecords } }, function(e, res) {});
                return generateDatawithNewHeader(chunk, _hasHeader, mapping, template);
            },
            // chunk: function(results, streamer) {

            //     if (!results)
            //         return;

            //     //console.log('finished', streamer.streamer._finished);
            //     //console.log('streamer', streamer.streamer);

            //     // calculate progress
            //     let progress = Math.round((streamer.streamer._config.chunkSize * chunks) / streamer.streamer._input.size * 100);
            //     progress = progress > 100 ? 100 : progress;
            //     let noOfRecords = streamer.streamer._rowCount;

            //     // insert chunk data in mongo db
            //     streamer.pause();
            //     //Meteor.call('products.insertCSVData', fileID, results.data, function() {
            //     insertCSVData(fileID, results.data, template, progress, streamer, function() {
            //         // update file progress
            //         Csvfiles.update(fileID, {
            //                 $set: { progress, noOfRecords }
            //             },
            //             function(e, res) {
            //                 if (progress < 100) {
            //                     //streamer.resume();
            //                 } else {
            //                     streamer.abort();
            //                     cb(); // callback 'parseCSV' method
            //                 }
            //             });
            //     });
            //     //console.log("Chunk data:", results.data.length, results);

            //     // update progress

            //     // let existFiles = template.files.get();
            //     // for (let i = 0; i < existFiles.length; i++) {
            //     //     if (existFiles[i].name == streamer.streamer._input.name)
            //     //         existFiles[i].progress = progress;
            //     // }
            //     // template.files.set(existFiles);
            //     //$(template.find('#btnNext')).find('.progress-inner').css({ 'width': progress + '%' })
            //     //$(template.find('#btnNext')).find('.content').text(progress + '% completed');
            //     //console.log('progress', progress);
            //     chunks++;
            // }
        });
    });
}

Template.readCSV.onCreated(function() {
    toastr.options = {
        "closeButton": true,
        "showMethod": "show",
        "hideDuration": "1000",
        "showDuration": "0",
        "timeOut": "10000000"
    }
    this.files = new ReactiveVar([]);
    this.csvHeaders = new ReactiveVar([]);
    this.headers = new ReactiveVar([]);
    this.previewRec = new ReactiveVar([]);
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
    this.dataTypes = new ReactiveVar(['text', 'integer', 'date']);
});

Template.readCSV.helpers({
    files() {
        return Template.instance().files.get();
    },
    headers() {
        let ft = Template.instance().filetypes.get(); // all file type
        let activeFiletype = _.find(ft, function(d) { return d.isActive }); // find active filetype
        //console.log('activeFiletype', activeFiletype);
        Template.instance().headers.set(activeFiletype.header);
        return Template.instance().headers.get();
    },
    csvHeaders() {
        return Template.instance().csvHeaders.get();
    },
    // distance() {
    //     let res = this.csvHeaders[0];
    //     // console.log(this.csvHeaders);
    //     let col = this.col;
    //     this.csvHeaders.forEach(function(d) {
    //         res = Levenshtein.get(col, d) < Levenshtein.get(col, res) ? d : res;
    //     });
    //     return res;
    // },
    previewRec() {
        return Template.instance().previewRec.get();
    },
    filetypes() {
        return Template.instance().filetypes.get();
    },
    dataTypes() {
        return Template.instance().dataTypes.get();
    },
    getJsonValues(obj) {
        return Object.values(obj);
    },
    getJsonKeys(obj) {
        return Object.keys(obj);
    }
});

let insertCSVData = function(data, fileID, collection, cb) {
    let copedata = $.extend({}, data);
    copedata['fileID'] = fileID;
    copedata['owner'] = Meteor.userId();
    copedata['username'] = Meteor.user().username;
    collection.insert(data, function(err, res) {
        if (err) {
            //console.log('errmessage', err.message);
            //console.log('err', err.invalidKeys);
            //console.log('data', data);
            $("#upload-csv-zone,#preview").hide();
            $("#handson-Zone-during-upload").show();

            $('#buttonProceedNext').show().find('.content').text('Proceed To Next');
            $('#btnNext').hide();
            toastr.error(err.message);
            //$("#errMessageFromSchema").text(err.message);

            renderHandsonTable(copedata, Object.keys(copedata), 'hotErrorDataDuringUpload', err, fileID, collection, cb);
        } else {
            cb(); // callback
        }
    });
}
let errorRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'red';
};

let getHandsonHeader = function(headers, invalidKeys) {
    let newHeaders = [];
    _.each(headers, function(val, inx) {
        if (_.find(invalidKeys, function(d) { return d.name == val; }) != undefined) {
            newHeaders.push({ colHeader: val, renderer: errorRenderer, data: val })
        } else {
            newHeaders.push({ colHeader: val, data: val })
        }
    });
    return newHeaders;
}

let renderHandsonTable = function(dataObject, headers, eleName, error, fileID, collection, cb) {
    //Csvfiles.update(fileID, {$set: { 'errorString' :  error }});
    //  console.log(headers);
    //console.log('error', error.invalidKeys);
    //console.log('headers', headers);
    let newHeaders = getHandsonHeader(headers, error.invalidKeys);
    //console.log('newHeaders', newHeaders);
    let hotSettings = {
        data: dataObject,
        columns: newHeaders,
        stretchH: 'all',
        autoWrapRow: true,
        //height: 441,
        //maxRows: 22,
        rowHeaders: true,
        //colHeaders: getHeadersValues(headers),
        colHeaders: headers,
        afterChange: function(changes, source) {
            //updateErrorData(changes, source, dataObject, fileID);
            $("#buttonProceedNext").unbind('click').click(function() {
                console.log('afterchange', dataObject);
                insertCSVData(dataObject, fileID, collection, cb);
            });
        }
    };
    hotElement = document.querySelector('#' + eleName);

    objHandsontable = new Handsontable(hotElement, hotSettings);
}

Template.EditorPage.helpers({
    "editorOptions": function() {
        return {
            lineNumbers: true,
            mode: "javascript"
        }
    },

    "editorCode": function() {
        return "function(row){\n return row; \n};\n";
    }
});