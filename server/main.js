import '../imports/api/collections.js';


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



  Meteor.methods({
    // The method expects a valid IPv4 address
    'getESUser': function (jobQueue) {
      let objOptions = {
        host: '7e94c6196993fd6c3d570a3d40e100d1.us-east-1.aws.found.io',
        path: '_xpack/security/user/' + jobQueue.username,
        port: '9243',
        auth: 'elastic:SwmLSQli9PvtUNsm63Ce7dpr'
        // This is the only line that is new. `headers` is an object with the headers to request
        // headers: {'custom': 'Custom Header Demo works'}
      }
      let ESUserURL = 'https://' + objOptions.host + ':' + objOptions.port + '/' + objOptions.path
      // query the API
      //console.log(ESUserURL)
      let ESUser = HTTP.call( 'get', ESUserURL, { "auth": objOptions.auth })
      console.log("=========server call=============",ESUser)

      let versionNo = ESUser.metadata.user_version_history.length + 1
      let NewVersionNo = 'sup'+ ESUser.metadata.id + '_' + versionNo

      //return res
    }
  })
}
