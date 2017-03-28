import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { ProductInformationHeaders } from '../../lib/headers/product_information.js'
import { ProductInformationData } from '../../lib/headers/product_imprint_data.js'
import { ProductPrice } from '../../lib/headers/product_price.js'

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

        for (var i = 0; i < template.find('#csv-file').files.length; i++) {
            var regex = new RegExp("(.*?)\.(csv)$");
            if ((regex.test(template.find('#csv-file').files[i].name))) {
                // view file progress
                let existFiles = template.files.get();
                existFiles.splice(0, 0, { name: template.find('#csv-file').files[i].name, progress: 0, mapping: true });
                template.files.set(existFiles);

                _files.push(template.find('#csv-file').files[i]);
            }
        }
        Papa.LocalChunkSize = 1000000; // 1000kb
        for (var i = 0; i < _files.length; i++) {
            getHeader(_files[i], template);
            //parseCSV(_files[i], template); // parse csv to json using papa parse
        }
    },
    "click #btnPreview": function(event, template) {
        // get new mapping
        let mapping = [];
        ProductInformationHeaders.forEach(function(result, index) {
            mapping.push({
                sysHeader: template.find('#dpdsysheader_' + index).innerHTML,
                csvHeader: template.find('#dpdcsvheader_' + index).value,
                datatype: template.find('#dpddatatype_' + index).value,
            })
        });

        insertCSVMapping(mapping, function(e, res) {
            previewRecord(template.find('#csv-file').files[0], template, mapping);
            template.find("#mapping").style.display = 'none';
            template.find("#preview").style.display = 'block';

        });
        console.log('mapping', mapping);

    },
    'click #btnNext': function(event, template) {
        parseCSV(template.find('#csv-file').files[0], template, function() {
            template.find('#csv-file').files.value = "";
            template.find("#mapping").style.display = 'none';
            template.find("#preview").style.display = 'none';
        });
    }
});

var insertCSVMapping = function(data, cb) {
    let _data = {
        data: data,
        createdAt: new Date(),
        updateAt: new Date(),
        deleteAt: '',
        owner: Meteor.userId(),
        username: Meteor.user().username
    }
    Csvfilemapping.insert(_data, function(e, res) {
        cb(e, res);
    });
}

var getHeader = function(_file, template) {
    Papa.parse(_file, {
        header: true,
        dynamicTyping: true,
        encoding: "UTF-8",
        skipEmptyLines: true,
        beforeFirstChunk: function(chunk) {
            let rows = chunk.split(/\r\n|\r|\n/);
            let headings = rows[0].split(',');
            //console.log('headings', headings);
            template.csvHeaders.set(headings);
            // headings[0] = 'newHeading';
            // rows[0] = headings.join();
            // console.log(rows.join('\n'));
        },
        complete: function(results) {
            //console.log('results', results);
        },
        error: function(error, f) {
            console.log("ERROR:", error, f);
        },
        chunk: function(results, streamer) {
            streamer.abort();
            return;
        }
    });
};


var previewRecord = function(_file, template, mapping) {
    Papa.parse(_file, {
        header: true,
        dynamicTyping: true,
        encoding: "UTF-8",
        skipEmptyLines: true,
        beforeFirstChunk: function(chunk) {
            let rows = chunk.split(/\r\n|\r|\n/);
            let headings = rows[0].split(',');
            headings.forEach(function(result, index) {
                mapping.forEach(function(d) {
                    if (d.csvHeader.trim() == result.trim()) {
                        headings[index] = d.sysHeader.trim()
                    }
                });
            });
            rows[0] = headings.join();
            return rows.join('\n');
        },
        complete: function(results) {
            //console.log('results', results);
        },
        error: function(error, f) {
            console.log("ERROR:", error, f);
        },
        chunk: function(results, streamer) {
            console.log('results', results);
            template.previewRec.set(results.data.slice(0, 10));
            streamer.abort();
            return;
        }
    });
};


var parseCSV = function(_file, template, cb) {
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
        console.log('fileID', fileID);
        let chunks = 1;
        Papa.parse(_file, {
            header: true,
            dynamicTyping: true,
            encoding: "UTF-8",
            skipEmptyLines: true,
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
                console.log('streamer', streamer.streamer);

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
                for (var i = 0; i < existFiles.length; i++) {
                    if (existFiles[i].name == streamer.streamer._input.name)
                        existFiles[i].progress = progress;
                }
                template.files.set(existFiles);

                template.find('#btnNext').children[0].innerHTML = progress + '% completed';
                template.find('#btnNext').children[1].children[0].style.width = progress + '%';
                console.log('progress', progress);
                chunks++;
            }
        });
    });
}

Template.readCSV.onCreated(function() {
    this.files = new ReactiveVar([]);
    this.csvHeaders = new ReactiveVar([]);
    this.previewRec = new ReactiveVar([]);
});

Template.readCSV.helpers({
    files() {
        return Template.instance().files.get();
    },
    headers() {
        return ProductInformationHeaders;
    },
    csvHeaders() {
        return Template.instance().csvHeaders.get();
    },
    distance() {
        let res = this.csvHeaders[0];
        // console.log(this.csvHeaders);
        let col = this.col;
        this.csvHeaders.forEach(function(d) {
            res = Levenshtein.get(col, d) < Levenshtein.get(col, res) ? d : res;
        });
        return res;
    },
    previewRec() {
        return Template.instance().previewRec.get();
    }
});


// var insertCSVData = function(fileID, datas, cb) {
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