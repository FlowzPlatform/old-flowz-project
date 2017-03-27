import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Products } from '../api/collections.js';
import { Csvfiles } from '../api/collections.js';


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
                existFiles.splice(0, 0, { name: template.find('#csv-file').files[i].name, progress: 0 });
                template.files.set(existFiles);

                _files.push(template.find('#csv-file').files[i]);
            }
        }
        Papa.LocalChunkSize = 1000000; // 1000kb
        for (var i = 0; i < _files.length; i++) {
            parseCSV(_files[i], template); // parse csv to json using papa parse
        }
    }
});

var parseCSV = function(_file, template) {
    let file = {
        name: _file.name,
        size: _file.size,
        progress: 0,
        noOfRecords: 0,
        createdAt: new Date(),
        updateAt: new Date(),
        deleteAt: new Date(),
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
                            if (progress < 100)
                                streamer.resume();
                            else
                                streamer.abort()
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

                console.log('progress', progress);
                chunks++;
            }
        });
    });
}


Template.readCSV.onCreated(function() {
    this.files = new ReactiveVar([]);
});


Template.readCSV.helpers({
    files() {
        return Template.instance().files.get();
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