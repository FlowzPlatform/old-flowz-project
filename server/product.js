import { Meteor } from 'meteor/meteor';
import { CollProductInformation } from '../imports/api/collections.js';
import { Csvfiles } from '../imports/api/collections.js';
import { CollUploadJobMaster } from '../imports/api/collections.js';

Meteor.methods({
    'products.insertCSVData': function(fileID, datas) {
        let _data = [];
        datas.forEach(function(d) {
            d['fileID'] = fileID;
            d['owner'] = Meteor.userId();
            d['username'] = Meteor.user().username;
            _data.push(d);
        });
        return CollProductInformation.batchInsert(_data);
    }
});

if (Meteor.isServer) {
  Meteor.methods({
    'abortInLanding': function(userId , documentId){

      if (CollUploadJobMaster.findOne().owner == this.userId) {
        return  CollUploadJobMaster.remove({_id: documentId});
      }

    }
});
}
