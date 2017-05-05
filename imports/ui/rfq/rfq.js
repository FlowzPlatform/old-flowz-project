  import { Meteor } from 'meteor/meteor';
  import { Template } from 'meteor/templating';
  import { ReactiveDict } from 'meteor/reactive-dict';
  import { ReactiveVar } from 'meteor/reactive-var';

  import './rfq.html';

  import { CollCloseOutPromoRFQSent } from '../../api/collections.js';

  Template.rfq.events({
      'click .rfq_id': function(event, template) {
          let currentEl = event.currentTarget;
          $('.rfq-view .nav li').removeClass('active');
          $(currentEl).addClass('active');
          let rfqId = $(currentEl).attr('data-id');
          getDiscussion(rfqId, template);
      },
      'click #btnReply': function(event, template) {
          replay(template);
      },
      'keypress  #txtReply': function(event, template) {
          if (event.which === 13) {
              event.stopPropagation();
              replay(template);
              return false;
          }
      }
  });

  let replay = function(template) {
      let txtReply = tinyMCE.get('txtReply').getContent();
      let activeRfq = template.rfqdiscussion.get();
      let replyMessage = {
          from: Meteor.userId(),
          message: '<p>' + txtReply + '</p>',
          to: CollCloseOutPromoRFQSent.find({ _id: activeRfq._id }).OwnerId
      }
      activeRfq._source.discussion.push(replyMessage);
      saveReply(activeRfq, template, function() {
          template.rfqdiscussion.set(activeRfq);
          tinyMCE.get('txtReply').setContent('');
          setTimeout(function() {
              $('.rfq-discussion').scrollTop($('.rfq-discussion')[0].scrollHeight);
          }, 100);
      })
  }


  let saveReply = function(updatedRfq, template, cb) {
      let bulkRows = [{ "update": { "_id": updatedRfq._id, "_type": "discussions", "_index": "rfq" } }, { "doc": { "discussion": updatedRfq._source.discussion } }];
      let bulkRowsString = bulkRows.map(function(row) {
          return JSON.stringify(row);
      }).join("\n") + "\n"

      $.ajax({
          url: Meteor.settings.public.elasticsearch.host + "/_bulk",
          type: "POST",
          xhrFields: {
              withCredentials: true
          },
          //dataType: "application/json; charset=utf-8",
          data: bulkRowsString,
          dataType: "text",
          username: Meteor.settings.public.elasticsearch.username, // Most SAP web services require credentials
          password: Meteor.settings.public.elasticsearch.password,
          success: function(response) { if (!response.errors) { cb(); } },
          error: function(xhr, ajaxOptions, thrownError) {},
      });
  }

  let getDiscussion = function(rfqId, template) {
      let _rfq = template.rfq.get();
      //console.log('rfqId', rfqId);
      let data = _.find(_rfq, function(d) { return d._id == rfqId });
      //console.log('selecteddata', data);
      template.rfqdiscussion.set(data);
  }

  Template.tinymce.onRendered(function() {
      tinymce.init({
          selector: '.tinymce',
          skin_url: '/packages/teamon_tinymce/skins/lightgray',
          height: 200,
          menubar: false,
          plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table contextmenu paste code'
          ],
          toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
          content_css: '//www.tinymce.com/css/codepen.min.css'
      });
  })

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