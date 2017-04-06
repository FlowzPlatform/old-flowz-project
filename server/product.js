import { Meteor } from 'meteor/meteor';
import { CollProductInformation } from '../imports/api/collections.js';
import { Csvfiles } from '../imports/api/collections.js';

import { CollUploadJobMaster } from '../imports/api/collections.js';


/*

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

*/
if (Meteor.isServer) {
    Meteor.methods({
        'abortInLanding': function(userId, documentId) {

            if (CollUploadJobMaster.findOne().owner == this.userId) {
                //return  CollUploadJobMaster.remove({_id: documentId});

                CollUploadJobMaster.update({ _id: documentId }, {
                    $set: {

                masterJobStatus: "aborted"

                    }
                }, function(e, res) {
                    if (e) {
                        log(e);
                    }
                    console.log("updated deleteAt into master collection", Meteor.userId());
                    //Router.go("upload")
                })
            }

    }
});



Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  bucket: "airflowbucket1",

  //acl: "public-read",

  authorize: function () {
  //  Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    var user = Meteor.users.findOne(this.userId);
    return  "uploader_prod_image"+"/"+user.username + "/" + file.name;
  }
});


}