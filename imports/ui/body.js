import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';


import { ProductInformationHeaders } from '../../lib/headers/product_information.js'
import { ProductPriceHeaders } from '../../lib/headers/product_price.js'
import { ProductImprintDataHeaders } from '../../lib/headers/product_imprint_data.js'
import { ProductImageHeaders } from '../../lib/headers/product_images.js'
import { ProductShippingHeaders } from '../../lib/headers/product_shipping.js'
import { ProductAdditionalChargeHeaders } from '../../lib/headers/product_additional_charge.js'
import { ProductVariationPricingHeaders } from '../../lib/headers/product_variation_pricing.js'



import { Products } from '../api/collections.js';
import { Csvfiles } from '../api/collections.js';
import { Csvfilemapping } from '../api/collections.js';


import './body.html';

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('lll');
});

Template.readCSV.events({
    "change #csv-file": function(event, template) {
        let _files = [];

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
            //template.find("#mapping").style.display = 'block';
            $(template.find("#mapping")).show().find('.spinner').show();

            getHeader(_files[i], template, function() {
                generateXEditor(template, function() { // generate x-editor
                    $(template.find("#mapping")).find('.spinner').hide();
                });
            });
            //parseCSV(_files[i], template); // parse csv to json using papa parse
        }
    },
    "click #btnPreview": function(event, template) {

        let mapping = generateMapping(template); // generate new Mapping

        $(template.find('#btnPreview')).find('.progress-inner').css({ width: '45%' });
        // generate Preview
        generatePreview(template.find('#csv-file').files[0], template, mapping, function() {
            template.find('#btnPreview').children[1].children[0].style.width = '100%';
            //template.find("#mapping").style.display = 'none';
            $(template.find("#preview")).show();
            $(template.find("#upload-csv-zone")).hide();
            $(template.find('#btnPreview')).find('.progress-inner').css({ width: '0%' });
        });

        // insert csv maaping in db

        // // let ft = template.filetypes.get(); // all file type
        // // let activeFiletypeId = _.find(ft, function(d) { return d.isActive }).id;
        // // insertCSVMapping(activeFiletypeId, mapping, function(e, res) {});

        //console.log('mapping', mapping);

    },
    'click #btnNext': function(event, template) {

        $(template.find('#btnNext')).addClass('inProgress');

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
    }
});

let generateMapping = function(template) {
    // get new mapping
    let mapping = [];
    let activefile = template.headers.get(); // get active file type data

    // create mapping
    activefile.forEach(function(result, index) {
        mapping.push({
            sysHeader: template.find('#dpdsysheader_' + index).innerHTML,
            csvHeader: template.find('#dpdcsvheader_' + index).innerHTML,
            datatype: template.find('#dpddatatype_' + index).innerHTML,
        })
    });
    return mapping;
}

let getExistCSVHeader = function(template) {
    let ft = template.filetypes.get(); // all file type
    let fileTypeID = _.find(ft, function(d) { return d.isActive }).id;
    let isExist = Csvfilemapping.findOne({ owner: Meteor.userId(), fileTypeID: fileTypeID });
    if (isExist != undefined) {
        return isExist.mapping;
    } else {
        return [];
    }
}

let generateXEditor = function(template, cb) {
    let activefile = template.headers.get(); // get active file type data
    let _csvHeader = template.csvHeaders.get();
    let _dataTypes = template.dataTypes.get();
    let _existCSVHeader = getExistCSVHeader(template);
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    //console.log('dataTypes', _dataTypes);
    //console.log('csvHeader', _csvHeader);
    // create mapping
    activefile.forEach(function(result, index) {
        let _val;
        let _datatype = result.type;

        // if already mapping header then first getting in db
        if (_existCSVHeader.length > 0) {
            _val = _.find(_existCSVHeader, function(d) { return d.sysHeader == result.column }).csvHeader;
            _datatype = _.find(_existCSVHeader, function(d) { return d.sysHeader == result.column }).datatype;
        } else {
            if (_hasHeader) {
                _val = getHeaderDistance(result.column, _csvHeader);
            } else {
                _val = _csvHeader[index]
            }
        }

        $(template.find('#dpdcsvheader_' + index)).editable({
            value: _val,
            source: _csvHeader
        });
        $(template.find('#dpdcsvheader_' + index)).editable('setValue', _val)
        $(template.find('#dpddatatype_' + index)).editable({
            value: _datatype,
            source: _dataTypes
        });
        $(template.find('#dpddatatype_' + index)).editable('setValue', _datatype)
    });
    cb();
}

let resetAll = function(template) {

    let ft = template.filetypes.get(); // all file type
    let activeFiletypeId = _.find(ft, function(d) { return d.isActive }).id;

    ft[activeFiletypeId - 1].isActive = false;
    ft[activeFiletypeId - 1].isDone = true;
    ft[activeFiletypeId].isActive = true;

    template.filetypes.set(ft)
    $(template.find('#csv-file')).val('');
    template.find("#mapping").style.display = 'none';
    template.find("#preview").style.display = 'none';
    template.find('#btnPreview').children[1].children[0].style.width = '0%';
    template.find('#btnNext').children[1].children[0].style.width = '0%';
    $(template.find('#btnNext')).removeClass('inProgress');
    $(template.find("#upload-csv-zone")).show();
    template.find('#btnNext').children[0].innerHTML = 'Upload record';

    // destroyXEditor

    let activefile = template.headers.get(); // get active file type data
    let _csvHeader = template.csvHeaders.get();
    let _dataTypes = template.dataTypes.get();

    //console.log('dataTypes', _dataTypes);
    //console.log('csvHeader', _csvHeader);
    // create mapping
    activefile.forEach(function(result, index) {
        let _val = getHeaderDistance(result.column, _csvHeader);
        $(template.find('#dpdcsvheader_' + index)).editable("destroy");
        $(template.find('#dpddatatype_' + index)).editable("destroy");
    });
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
    return ret;
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
            let headings = rows[0];
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
            return;
        }
    });
};


let generatePreview = function(_file, template, mapping, cb) {
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    Papa.parse(_file, {
        header: true,
        dynamicTyping: true,
        encoding: "UTF-8",
        skipEmptyLines: true,
        beforeFirstChunk: function(chunk) {
            let rows = CSVtoArray(chunk);
            let headings = rows[0];
            if (_hasHeader) {
                headings.forEach(function(result, index) {
                    mapping.forEach(function(d) {
                        if (d.csvHeader.trim() == result.trim()) {
                            headings[index] = d.sysHeader.trim()
                        }
                    });
                });
                return arrayToCSV(rows);
            } else {
                let newHeaders = [];
                headings.forEach(function(result, index) {
                    newHeaders.push('header' + (index + 1));
                });
                newHeaders.forEach(function(result, index) {
                    mapping.forEach(function(d) {
                        if (d.csvHeader.trim() == result.trim()) {
                            newHeaders[index] = d.sysHeader.trim()
                        }
                    });
                });
                return newHeaders.join(',') + '\n' + arrayToCSV(rows);
            }
        },
        complete: function(results) {
            //console.log('results', results);
        },
        error: function(error, f) {
            console.log("ERROR:", error, f);
        },
        chunk: function(results, streamer) {
            console.log('results', results);
            template.previewRec.set(results.data.slice(0, 5));
            streamer.abort();
            cb();
            return;
        }
    });
};

let parseCSV = function(_file, template, mapping, cb) {
    let _hasHeader = $(template.find('#hasheader')).prop('checked');
    let file = {
        name: _file.name,
        size: _file.size,
        progress: 0,
        noOfRecords: 0,
        createdAt: new Date(),
        updateAt: new Date(),
        deleteAt: '',
        owner: Meteor.userId(),
        username: Meteor.user().username
    };

    Csvfiles.insert(file, function(e, res) {
        let fileID = res; // new file id
        //console.log('fileID', fileID);
        let chunks = 1;
        Papa.parse(_file, {
            header: true,
            dynamicTyping: true,
            encoding: "UTF-8",
            skipEmptyLines: true,
            beforeFirstChunk: function(chunk) {
                let rows = CSVtoArray(chunk);
                let headings = rows[0];
                if (_hasHeader) {
                    headings.forEach(function(result, index) {
                        mapping.forEach(function(d) {
                            if (d.csvHeader.trim() == result.trim()) {
                                headings[index] = d.sysHeader.trim()
                            }
                        });
                    });
                    return arrayToCSV(rows);
                } else {
                    let newHeaders = [];
                    headings.forEach(function(result, index) {
                        newHeaders.push('header' + (index + 1));
                    });

                    newHeaders.forEach(function(result, index) {
                        mapping.forEach(function(d) {
                            if (d.csvHeader.trim() == result.trim()) {
                                newHeaders[index] = d.sysHeader.trim()
                            }
                        });
                    });
                    return newHeaders.join(',') + '\n' + arrayToCSV(rows);
                }
            },
            complete: function(results) {
                //console.log('results', results);
            },
            error: function(error, f) {
                console.log("ERROR:", error, f);
            },
            chunk: function(results, streamer) {

                if (!results)
                    return;

                //console.log('finished', streamer.streamer._finished);
                //console.log('streamer', streamer.streamer);

                // calculate progress
                let progress = Math.round((streamer.streamer._config.chunkSize * chunks) / streamer.streamer._input.size * 100);
                progress = progress > 100 ? 100 : progress;
                let noOfRecords = streamer.streamer._rowCount;

                // insert chunk data in mongo db
                streamer.pause();
                Meteor.call('products.insertCSVData', fileID, results.data, function() {
                    //insertCSVData(fileID, results.data, function(err, res) {
                    // update file progress
                    Csvfiles.update(fileID, {
                            $set: { progress, noOfRecords }
                        },
                        function(e, res) {
                            if (progress < 100) {
                                streamer.resume();
                            } else {
                                streamer.abort();
                                cb();
                            }
                        });
                });
                //console.log("Chunk data:", results.data.length, results);

                // update progress

                let existFiles = template.files.get();
                for (let i = 0; i < existFiles.length; i++) {
                    if (existFiles[i].name == streamer.streamer._input.name)
                        existFiles[i].progress = progress;
                }
                template.files.set(existFiles);

                template.find('#btnNext').children[0].innerHTML = progress + '% completed';
                template.find('#btnNext').children[1].children[0].style.width = progress + '%';
                //console.log('progress', progress);
                chunks++;
            }
        });
    });
}

Template.readCSV.onCreated(function() {
    this.files = new ReactiveVar([]);
    this.csvHeaders = new ReactiveVar([]);
    this.headers = new ReactiveVar([]);
    this.previewRec = new ReactiveVar([]);
    this.filetypes = new ReactiveVar(
        [
            { id: 1, name: 'Product Info', isDone: false, isActive: true },
            { id: 2, name: 'Product Pricing', isDone: false, isActive: false },
            { id: 3, name: 'Imprint Data', isDone: false, isActive: false },
            { id: 4, name: 'Image', isDone: false, isActive: false },
            { id: 5, name: 'Shipping', isDone: false, isActive: false },
            { id: 6, name: 'Additional Charges', isDone: false, isActive: false },
            { id: 7, name: 'Variation Price', isDone: false, isActive: false }
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
        let sysActiveHeader;

        switch (activeFiletype.id) {
            case 1: // product information
                sysActiveHeader = ProductInformationHeaders;
                break;
            case 2: // product Price
                sysActiveHeader = ProductPriceHeaders;
                break;
            case 3: // Product Imprint Data
                sysActiveHeader = ProductImprintDataHeaders;
                break;
            case 4:
                sysActiveHeader = ProductImageHeaders;
                break;
            case 5:
                sysActiveHeader = ProductShippingHeaders;
                break;
            case 6:
                sysActiveHeader = ProductAdditionalChargeHeaders;
                break;
            case 7:
                sysActiveHeader = ProductVariationPricingHeaders;
                break;
            default:
                sysActiveHeader = [];
                break;
        }
        Template.instance().headers.set(sysActiveHeader);
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
    }
});


// let insertCSVData = function(fileID, datas, cb) {
//     let _data = [];
//     datas.forEach(function(d) {
//         _data.push({
//             fileID: fileID,
//             data: d,
//             owner: Meteor.userId(),
//             username: Meteor.user().username,
//         });
//     });
//     Products.batchInsert(_data, function(err, res) { cb(err, res); });
// }