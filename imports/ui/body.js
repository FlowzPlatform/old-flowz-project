import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Csvfiles } from '../api/collections.js';


import './body.html';

Router.route('/', function() {
    this.render('readCSV');
});

Router.route('/history', function() {
    this.render('history');
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('lll');
});

Template.readCSV.events({
    "click .btnReadCsv": function(event, template) {
        Papa.LocalChunkSize = 1000000; // 1000kb

        let file = {
            name: template.find('#csv-file').files[0].name,
            size: template.find('#csv-file').files[0].size,
            progress: 0,
            noOfRecords: 0,
            createdAt: new Date(),
            updateAt: new Date(),
            deleteAt: new Date()
        };

        Meteor.call('products.insertCSVDetails', file, function(e, res) {
            let fileID = res; // new file id
            let chunks = 1;
            Papa.parse(template.find('#csv-file').files[0], {
                header: true,
                dynamicTyping: true,
                encoding: "UTF-8",
                skipEmptyLines: true,
                complete: function(results) {
                    //console.log('results', results);
                },
                error: function(error, file) {
                    console.log("ERROR:", error, file);
                },
                before: function(file, inputElem) {
                    console.log("Parsing file:", file);
                    //saveFileDetail(file);
                },
                chunk: function(results, streamer, file) {
                    if (!results)
                        return;
                    //console.log('finished', streamer.streamer._finished);
                    console.log('streamer', streamer.streamer._rowCount);

                    // calculate progress
                    let progress = Math.round((streamer.streamer._config.chunkSize * chunks) / streamer.streamer._input.size * 100);
                    progress = progress > 100 ? 100 : progress;
                    let noOfRecords = streamer.streamer._rowCount;

                    // insert chunk data in mongo db
                    streamer.pause();
                    Meteor.call('products.insertCSVData', results.data, function() {
                        // update file progress
                        Meteor.call('products.updateCSVDetails', fileID, { progress, noOfRecords }, function(e, res) {
                            if (progress < 100)
                                streamer.resume();
                            else
                                streamer.abort()
                        });
                    });
                    //console.log("Chunk data:", results.data.length, results);
                    // view process
                    template.find('#progress').innerHTML = progress;
                    console.log('progress', progress);
                    chunks++;
                }
            });
        });
    }
});

Template.history.helpers({
    files() {
        return Csvfiles.find({}, { sort: { createdAt: -1 } });
    },
});