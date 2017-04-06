import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import { ReactiveDict } from 'meteor/reactive-dict';
import { UploadedFiles } from '../../lib/collections.js';
//import { Images } from '../lib/collections.js';

//import { Images } from '../server/main.js';
import '../imports/startup/accounts-config.js';

import './imageUpload.html';

//var pageSession = new ReactiveDict();
const nMaxRetries = 3;
const ES_BULKPOST_URL = "http://172.16.105.197:9200/_bulk";
const BULK_ROW_SIZE = 100;
var dz;

Template.imageUpload.onCreated(function helloOnCreated() {

});

Template.imageUpload.onRendered(function() {
    //this.csv_files = new ReactiveArray();

    // Meteor.Dropzone.options.maxFiles = 1;
    //  Meteor.Dropzone.options.previewTemplate = '<div id="preview-template" >';
    Meteor.Dropzone.options.dictDefaultMessage = 'Drag and drop file here to upload ';
    Meteor.Dropzone.options.addRemoveLinks = true;
    Meteor.Dropzone.options.dictRemoveFile = "Remove File"; // Remove button text

    //Meteor.Dropzone.options.acceptedFiles = 'image/jpeg,image/png,image/gif';
    Meteor.Dropzone.options.acceptedFiles = '.jpg';
    Meteor.Dropzone.options.autoProcessQueue = true;
    Meteor.Dropzone.options.parallelUploads = 5; // Number of parallel upload file
    Meteor.Dropzone.options.processingmultiple = false;
    Meteor.Dropzone.options.uploadMultiple = false;




    var options = _.extend({}, Meteor.Dropzone.options, this.data);
    this.dropzone = new Dropzone('#my-awesome-dropzone.dropzone', options);

    var self = this;

    // this is how you get the response from the ajax call.
    this.dropzone.on('addedfile', function(file) {
        console.log("fileName:", file);
        //  UploadedFiles.insert(file.name, function(e, res) {
        //    if (e) {
        //      log(e);
        //    }
        //    console.log("inserted into mongo collection");
        //  })
    });
    this.dropzone.on('complete', function(file) {
        //   console.log('file');
        // console.log(file);
        // Images.insert(file, function (err, fileObj) {
        //     if (err){
        //     } else {
        //     }
        //   })
        //    var file_id;
        //    var values = {file_name: file.name, progress: "0"};
        //    console.log("oncompleted fileName:",file.name);
        var uploader = new Slingshot.Upload("myFileUploads");

        // uploader.send(file, function (error, downloadUrl) {
        //   if (error) {
        //     // Log service detailed response.
        //     console.error('Error uploading');
        //     console.log(error) ;
        //   }
        //   else {
        //     console.log("success");
        //   //  Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
        //   }
        // });


        //FS.Utility.eachFile(e, function(file) {
        //  var newFile = new FS.File(file);
        console.log(file);
        //   Images.insert(file, function (error, fileObj) {
        //     if (error) {
        //       toastr.error("Upload failed... please try again.");
        //     } else {
        //       toastr.success('Upload succeeded!');
        //     }
        // });
        // });
    });

    this.dropzone.on("uploadprogress", function(file, progress) {
        // Update progress bar with the value in the variable "progress", which
        // is the % total upload progress from 0 to 100

        console.log("progress:", progress);

    });

    this.dropzone.on('queuecomplete', function() {
        console.log("queuecomplete");


        //location.reload();
        //Router.go("uploaded_file", mergeObjects(Router.currentRouteParams(), {}));
    });

    this.dropzone.on('accept', function(file) {
        alert(4)
    })
    dz = this.dropzone;
})

Template.imageUpload.helpers({

});

Template.imageUpload.events({
    'click button' (event, instance) {
        // increment the counter when button is clicked
        console.log(document.getElementById('input').files[0]);
        // var uploader = new Slingshot.Upload("myFileUploads");
        //
        // uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
        //   if (error) {
        //     // Log service detailed response.
        //     console.error('Error uploading');
        //     console.log(error) ;
        //   }
        //   else {
        //     console.log("success");
        //   //  Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
        //   }
        // });
        instance.counter.set(instance.counter.get() + 1);
    },
});