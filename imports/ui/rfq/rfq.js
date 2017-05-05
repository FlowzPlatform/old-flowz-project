  import { Meteor } from 'meteor/meteor';
  import { Template } from 'meteor/templating';
  import { ReactiveDict } from 'meteor/reactive-dict';
  import { ReactiveVar } from 'meteor/reactive-var';

  import './rfq.html';

  import { CollCloseOutPromoRFQSent } from '../../api/collections.js';

  Template.rfq.events({
      'click .rfq_id': function(event, template) {
          var currentEl = event.currentTarget;
          $('.rfq-view .nav li').removeClass('active');
          $(currentEl).addClass('active');
          let rfqId = $(currentEl).attr('data-id');
          getDiscussion(rfqId, template);
      }
  });

  var getDiscussion = function(rfqId, template) {
      let _rfq = template.rfq.get();
      //console.log('rfqId', rfqId);
      let data = _.find(_rfq, function(d) { return d._id == rfqId });
      //console.log('selecteddata', data);
      template.rfqdiscussion.set(data);
      //   $.ajax({
      //       url: "https://7e94c6196993fd6c3d570a3d40e100d1.us-east-1.aws.found.io:9243/rfq/discussions/_search?q=rfqid:" + rfqId,
      //       type: "GET",
      //       xhrFields: {
      //           withCredentials: true
      //       },
      //       dataType: "application/json; charset=utf-8",
      //       username: "elastic", // Most SAP web services require credentials
      //       password: "SwmLSQli9PvtUNsm63Ce7dpr",
      //       processData: false,
      //       contentType: "application/json",
      //       //data: JSON.stringify(data),
      //       success: function(response) {
      //           template.rfqdiscussion.set(response.hits.hits);
      //       }
      //   });
  }

  Template.rfq.onCreated(function() {
      let rfqData = [];
      let rfqdiscussionData = {}
      $.ajax({
          //url: "https://7e94c6196993fd6c3d570a3d40e100d1.us-east-1.aws.found.io:9243/rfq/discussions/_search?q=sid:" + Meteor.userId(),
          url: Meteor.settings.public.elasticsearch.host + "/rfq/discussions/_search?q=sid:" + Meteor.userId(),
          type: "GET",
          xhrFields: {
              withCredentials: true
          },
          async: false,
          dataType: "application/json; charset=utf-8",
          username: Meteor.settings.public.elasticsearch.username, // Most SAP web services require credentials
          password: Meteor.settings.public.elasticsearch.password,
          //processData: false,
          //contentType: "application/json",
          //data: JSON.stringify(data),
          success: function(response) {},
          error: function(xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
              //alert(xhr.status);
              //alert(xhr.responseText);
              rfqData = (JSON.parse(xhr.responseText)).hits.hits;
              if (rfqData.length > 0) {
                  rfqdiscussionData = _.find(rfqData, function(d) { return d._id == rfqData[0]._id });
              }
          },
      });

      this.rfq = new ReactiveVar(rfqData);
      this.rfqdiscussion = new ReactiveVar(rfqdiscussionData);
  })

  Template.rfq.helpers({
      rfq() {
          return Template.instance().rfq.get();
      },
      rfqdiscussion() {
          return Template.instance().rfqdiscussion.get();
      }
  });