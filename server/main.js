import '../imports/api/collections.js';

import { CollUploadJobMaster } from '../imports/api/collections.js';


if (Meteor.isServer) {
  let myJobs = JobCollection('OBImportJobQueue');
  myJobs.allow({
    // Grant full permission to any authenticated user
    admin: function (userId, method, params) {
      return (userId ? true : true);
    }
  });

  Meteor.startup(function () {
    // Normal Meteor publish call, the server always
    // controls what each client can see
    Meteor.publish('allJobs', function () {
      return myJobs.find({});
    });

    // Start the myJobs queue running
    return myJobs.startJobServer();
  });


const ImportCompleted = 'import_completed'
const masterJobStatusCompleted = 'completed'
  Meteor.methods({
    // The method expects a valid IPv4 address
    'getESUser': function (jobQueue) {
      let objOptions = {
        // host: 'localhost',
        // port: '9200',
        // auth: 'elastic:changeme',
        host: 'e128e59136400347637da727965922e5.us-east-1.aws.found.io',
        port: '9243',
        auth: 'elastic:OHQ0CzscklU0ttV59JicgNyH',
        path: '_xpack/security/user/' + jobQueue.username
        // This is the only line that is new. `headers` is an object with the headers to request
        // headers: {'custom': 'Custom Header Demo works'}
      }
      let ESUserURL = 'https://' + objOptions.host + ':' + objOptions.port + '/' + objOptions.path
      // query the API
      console.log(ESUserURL)
      let ESUser = HTTP.call( 'get', ESUserURL, { "auth": objOptions.auth })
      let ESUserData = ESUser.data[jobQueue.username]
      console.log("=========server call=============",ESUserData)
      let versionNo = 1
      if (ESUserData.metadata.user_version_history) {
          versionNo = ESUserData.metadata.user_version_history.length + 1
      }
      else {
        ESUserData.metadata.user_version_history = []
      }
      let NewVersionNo = 'sup' + ESUserData.metadata.id + '_' + versionNo
      ESUserData.metadata.user_version_history.push(NewVersionNo)
      ESUserData.metadata.sid = NewVersionNo
      console.log("====Updated EsUser:",ESUserData)

      var result = HTTP.call("PUT",  ESUserURL,
        {"auth": objOptions.auth, data:ESUserData, headers:{"content-type":"application/json"}},
         function (error,result) {
                     console.log("==Data Updated==",result);
                   });
      //return res
      console.log(jobQueue)
      let guid=jobQueue._id;
      var query = {
          "$set": {
              "stepStatus": ImportCompleted,
              "masterJobStatus": masterJobStatusCompleted
          }
      }
      //console.log(query);
      let updResult = CollUploadJobMaster.update({_id: guid}, query,function(err,result){
        if(!err)
        {
            //Router.go("/");
        }
      });
    }
  })
}
