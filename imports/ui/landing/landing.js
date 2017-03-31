import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './landing.html';

import { Csvfiles } from '../../api/collections.js';
import { CollUploadJobMaster } from '../../api/collections.js';



Template.landing.events({
    'click #selectUploadType' (event) {
      let uploadType = {
          uploadType: "Replace"
      };
      CollUploadJobMaster.insert(uploadType, function(e, res) {
        if (e) {
          log(e);
        }
        console.log("inserted into master collection");
      })
    }
});
