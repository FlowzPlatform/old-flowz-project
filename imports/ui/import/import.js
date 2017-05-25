import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './import.html';

import { Csvfiles } from '../../api/collections.js';
import { CollUploadJobMaster } from '../../api/collections.js';

// Step Status
const ValidationRunning = 'validation_running'
const ValidationCompleted = 'validation_completed'
const ImportRunning = 'import_in_progress'
const ImportToConfirm = 'import_to_confirm'
const ImportCompleted = 'import_completed'
const masterJobStatusRunning = 'running'
const masterJobStatusCompleted = 'completed'


Template.import.helpers({
    // files() {
    //     return Csvfiles.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } });
    // },
    jobQueue() {
      let qry={owner:Meteor.userId(),"masterJobStatus":masterJobStatusRunning};
      let job = CollUploadJobMaster.find(qry).fetch();
      job = job[0];
      //console.log(job)
      //Template.instance().jobQueue.set(job);
      return job ;
    },
    isImportToConfirm(status)
    {
        if (status == ImportToConfirm) {
          return true
        } else {
          return false
        }
    },
    isImportStart(status)
    {
        if (status == ImportRunning) {
          return true
        } else {
          return false
        }
    },
    isImportCompleted(status)
    {
        if (status == ImportCompleted) {
          Router.go("/uploaderdashboard");
          return true
        } else {
          return false
        }
    },
    importStart:function()
    {
      let qry={owner:Meteor.userId(),"masterJobStatus":masterJobStatusRunning,"stepStatus":ImportToConfirm};
      job = CollUploadJobMaster.find(qry).fetch();
      job = job[0];
      //console.log(job);
      let guid=job._id;
      var query = {
          "$set": {
              stepStatus: ImportRunning
          }
      };
      let updResult = CollUploadJobMaster.update({_id: guid}, query,{},function(error,result){
        console.log("==========instantiateJobQueue====error===========")
        if(!error) {
          Meteor.validatorFunctions.instantiateJobQueue();
        }
      });
      Router.go("/import");
    },
});

Template.import.events({
    'click #import_confirm' (event) {
        swal({
                title: "Are you sure?",
                text: "All Product data are successfully imported to PDM. Please confirm to go live.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Confirm it!",
                closeOnConfirm: true
            },
            function(isConfirm) {
                if(isConfirm)
                {
                  let qry={owner:Meteor.userId(),"masterJobStatus":masterJobStatusRunning,"stepStatus":ImportToConfirm};
                  let job = CollUploadJobMaster.find(qry).fetch()
                  job = job[0]
                  getESUser(job)
                }
            });
    },
    'click #importCompletedAbortBtnId' (event) {
        swal({
                title: "Are you sure?",
                text: "All Product data are successfully imported to PDM. you have to start again",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Abort it!",
                closeOnConfirm: true
            },
            function(isConfirm) {
                if(isConfirm)
                {
                  let qry={owner:Meteor.userId(),"masterJobStatus":masterJobStatusRunning,"stepStatus":ImportToConfirm};
                  jobQueue = CollUploadJobMaster.find(qry).fetch();
                  //console.log(jobQueue);
                  jobQueue=jobQueue[0];

                  let guid=jobQueue._id;
                  var query = {
                      "$set": {
                          "stepStatus":ValidationCompleted
                      }
                  }
                  //console.log(query);
                  let updResult = CollUploadJobMaster.update({_id: guid}, query,function(err,result){
                    if(!err)
                    {
                        Router.go("/");
                    }
                  });
                }
            });
    }
});



Template.import.onCreated( function () {

  let width = 1
  //  let id = setInterval(frame, 100);
})

Template.import.onRendered(function() {
  /*
  let qry={owner:Meteor.userId(),"masterJobStatus":masterJobStatusRunning};
  job = CollUploadJobMaster.find(qry).fetch();
  console.log("=======hello 111============",job)
  if(job.length>0)
  {
      Router.go("/");
  }
  */
});

let updateMasterJobQueueStatus = function (job) {
  let jobQueue = job
  let guid = jobQueue._id
  var query = {
    '$set': {
      'stepStatus': ValidationCompleted
    }
  }
  let updResult = CollUploadJobMaster.update({_id: guid}, query, function (err, result) {
    if (!err) {
      Router.go('/')
    }
  })
}

function updateESUserUpdateVersion (job, ESUser) {
  console.log("====================", ESUser)
}

function getESUser (jobQueue) {
  Meteor.call('getESUser', jobQueue, function (err, res) {
    if (err) throw err
    // Session.set("ESUserData", res)
    // updateESUserUpdateVersion(jobQueue, JSON.parse(res))
  })
}
