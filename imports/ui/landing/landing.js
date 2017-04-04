import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './landing.html';

import { Csvfiles } from '../../api/collections.js';
import { CollUploadJobMaster } from '../../api/collections.js';

Template.landing.onRendered(function() {



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


    'click #getOptions' (event) {
      var elems = document.getElementById('myform').elements;
      var selected_option = elems['myOptions'].value;
      if (selected_option == "") {
        $('#display-error').fadeIn().delay(4000).fadeOut();
      }else{

        CollUploadJobMaster.upsert(Meteor.userId(), {
            // Modifier
            $set: {
                uploadType: selected_option.toLowerCase(),
                createdAt: new Date(),
                deleteAt: '',
                owner: Meteor.userId(),
                username: Meteor.user().username
            }
        }, function(e, res) {
          if (e) {
            log(e);
          }
          console.log("inserted into master collection" ,Meteor.userId());
          Router.go("upload")
        })
      }

    }
});
