import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './landing.html';

import { Csvfiles } from '../../api/collections.js';
import { CollUploadJobMaster } from '../../api/collections.js';

const reactiveArray = [
    { id: 'ProductInformation', name: 'Product Information', isDone: false, isActive: true},
    { id: 'ProductPrice', name: 'Product Pricing', isDone: false, isActive: false},
    { id: 'ProductImprintData', name: 'Imprint Data', isDone: false, isActive: false},
    { id: 'ProductImage', name: 'Image', isDone: false, isActive: false},
    { id: 'ProductShipping', name: 'Shipping', isDone: false, isActive: false},
    { id: 'ProductAdditionalCharges', name: 'Additional Charges', isDone: false, isActive: false},
    { id: 'ProductVariationPrice', name: 'Variation Price', isDone: false, isActive: false}
]

Template.landing.onRendered(function() {

})

Template.landing.helpers({
  getStatusFromMaster() {
    console.log(CollUploadJobMaster.find({ owner: Meteor.userId() , masterJobStatus : "running"}).count());
      //return CollUploadJobMaster.find({ owner: Meteor.userId() , deleteAt : "", masterJobStatus : {$ne : "compleated"}});
      return CollUploadJobMaster.find({ owner: Meteor.userId() ,  masterJobStatus : "running"});
  },
  hasStatus(){
      all = CollUploadJobMaster.find({ owner: Meteor.userId() , masterJobStatus : "running"}).fetch();
      showStatusOnLanding = [];
      for(var i =0; i<reactiveArray.length; i++ ){
        let findExistingId = reactiveArray[i].id;
        console.log(all[0][findExistingId]);
        if (all[0][findExistingId] == undefined) {
          break;
        }else{
          all[0][findExistingId]["sheetName"] = reactiveArray[i].id;
          showStatusOnLanding.push(all[0][findExistingId]);
        }
      }
      if (showStatusOnLanding.length == 0 ) {
        return false;
      }else{
        return showStatusOnLanding;
      }
  }

})

Template.landing.events({

    'change .show_infoDiv': function(event, template) {
      var data=$("input[name='myOptions']:checked").val();
      if (data == "replace") {
        $(".selected_tick1").css("display" , "block");
        $(".selected_tick2").css("display" , "none");
        $(".selected_tick3").css("display" , "none");
        $(".selected_tick4").css("display" , "none");
      }else if(data == "append"){
        $(".selected_tick1").css("display" , "none");
        $(".selected_tick2").css("display" , "block");
        $(".selected_tick3").css("display" , "none");
        $(".selected_tick4").css("display" , "none");
      }else if (data == "upsert") {
        $(".selected_tick1").css("display" , "none");
        $(".selected_tick2").css("display" , "none");
        $(".selected_tick3").css("display" , "block");
        $(".selected_tick4").css("display" , "none");
      }else if (data == "update") {
        $(".selected_tick1").css("display" , "none");
        $(".selected_tick2").css("display" , "none");
        $(".selected_tick3").css("display" , "none");
        $(".selected_tick4").css("display" , "block");
      }
    },


    'mouseover .btn' (event){

      document.getElementById("dv").style.display="block";
      var img = $('#dv_img');
      var data = event.currentTarget.innerText;
      if(data == "REPLACE") {
          $("selected_tick").css("display" , "block");
          $( "#get" ).html( "<p> By choosing <b>Replace</b> method you can remove all your old data and add the new one.Replace all the old products with new one.</p><p>e.g. Old records existed- A , B , C / New records uploaded- C' ,D ,E</p><p>Final result will be - C' ,D ,E</p>");
      }
      else if(data == "APPEND") {

          $("selected_tick").css("display" , "block");
          $( "#get" ).html( "<p> By choosing <b>Append</b> method you can Keep all the old products and add the new one . No old records will be updated .</p><p>e.g. Old records existed- A , B , C / New records uploaded- C' , D ,E</p><p>Final result will be - A ,B ,C ,D ,E</p>" );
      }
      else if(data == "UPSERT") {

          $("selected_tick").css("display" , "block");
          $( "#get" ).html( " <p> By choosing <b>Upsert</b> method you can Keep all the old products , update old records and add the new one .</p><p>e.g. Old records existed- A , B , C / New records uploaded- C' , D ,E</p><p>Final result will be - A ,B ,C' ,D , E</p>" );
      }
      else if(data == "UPDATE") {

          $("selected_tick").css("display" , "block");
          $( "#get" ).html( "<p> By choosing <b>Update</b> method you can Keep all the old products and update old records . No new products can be added in this method</p><p>e.g. Old records existed- A , B , C / New records uploaded- C' , D ,E</p><p>Final result will be - A ,B ,C'</p>" );
      }
    },



    'click #close_info_div' (event){
      document.getElementById("dv").style.display="none"
    } ,

    'click #landingContinuetBtnId' (event){

      let getStepStatus = CollUploadJobMaster.findOne({ owner: Meteor.userId() , masterJobStatus : "running"}).stepStatus;
      if (getStepStatus == "upload_pending") {
        Router.go("upload")
      }else if (getStepStatus == "validation_running" || getStepStatus == "validation_compleated") {
        Router.go("validation")
      }else if (getStepStatus == "import_in_proress") {
        Router.go("import");
      }else{
        Router.go("/");
      }
    },
    'click #landingAbortBtnId' (event){
      swal({
            title: "Are you sure?",
            text: "All your existing uploaded file will be deleted and you have to upload the files again",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Abort it!",
            closeOnConfirm: false
          },
          function(){
            let _id = CollUploadJobMaster.findOne({ owner: Meteor.userId() , masterJobStatus : "running"})._id;
            console.log(_id);
            Meteor.call("abortInLanding" , Meteor.userId(),_id, 'aborted' ,function (err , success) {
              if (err) {
                swal("Error!", "Something bad happend.Please try again later", "warning");
              }else
              {
                swal("Aborted!", "Your files has been deleted.", "success");
              }
            });
            //CollUploadJobMaster.remove({_id: CollUploadJobMaster.findOne()._id});


          });
    },
    'click #getOptions' (event) {
      var elems = document.getElementById('myform').elements;
      var selected_option = elems['myOptions'].value;
      if (selected_option == "") {
        $('#display-error').fadeIn().delay(4000).fadeOut();
      }else{
        CollUploadJobMaster.insert({
            // Modifier

                createdAt: new Date(),

                owner: Meteor.userId(),
                stepStatus: "upload_pending",
                username: Meteor.user().username,
                uploadType: selected_option.toLowerCase(),
                masterJobStatus : "running"

        }, function(e, res) {
          if (e) {
            log(e);
          }
          console.log("inserted into master collection" ,Meteor.userId());
          Router.go("upload")
        })
      }

    },
    // "click #upload" (event) {
    //   var uploader = new Slingshot.Upload("myFileUploads");
    //
    //     uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
    //       if (error) {
    //         // Log service detailed response.
    //         console.error('Error uploading');
    //         console.log(error);
    //       }
    //       else {
    //         console.log(downloadUrl);
    //         //Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
    //       }
    //     });
    // }
});
