import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

 import './import.html';

import { Csvfiles } from '../../api/collections.js';
import { CollUploadJobMaster } from '../../api/collections.js';


Template.import.helpers({
    // files() {
    //     return Csvfiles.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } });
    // },
});



Template.import.onCreated(function() {

    let width = 1;
    let id = setInterval(frame, 100);
    function frame() {

      if (width >= 100) {
        clearInterval(id);
        swal({
              title: "Thank You",
              text: "Your Data Has been uploaded to PDM successfully",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Ok",
              closeOnConfirm: true
            },
            function(){

              let _id = CollUploadJobMaster.findOne({ owner: Meteor.userId() , masterJobStatus : "running"})._id;
              if (_id != "" || _id != undefined) {
                Meteor.call("abortInLanding" , Meteor.userId(),_id, 'compleated' ,function (err , success) {
                  if (err) {
                    swal("Error!", "Something bad happend.Please try again later", "warning");
                  }else
                  {
                    //console.log(success);
                    swal("Redirecting to Home screen", "success");
                    Router.go("/")
                  }
                });
              }

            });
      } else {
        width++;
        document.getElementById("myBar").style.width = width + '%';

      }
    }


})
