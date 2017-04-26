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
}
