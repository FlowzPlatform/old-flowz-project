import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './validation.html';

import { CollProductInformation, CollProductPrice, CollProductImprintData, CollProductImage, CollProductShipping, CollProductAdditionalCharges, CollProductVariationPrice } from '../../api/collections.js';
import { Csvfiles } from '../../api/collections.js';

import { CollUploadJobMaster } from '../../api/collections.js';

const fromValidate = "mongo"; // It can be mongo/es(elasticsearch)
let currentRule = 0;
let productData = Array();
let headers = Array();
let CurrentValidation = '';
let currentValidationName = '';
const divNameOfhandsontable = 'productData';
// const esUrl='http:/localhost:9200/pdmrawdata/';
const esUrl = 'http://localhost:9200/pdmrowdata/';
let objHandsontable = null;
let invalidColumnColor = 'red';
let currentjobQueue = null;
import { ProductInformationRules } from '../../../lib/validatorRules/product_information.js';
import { ProductPriceRules } from '../../../lib/validatorRules/product_price.js';
import { ProductImageRules } from '../../../lib/validatorRules/product_images.js';
import { ProductShippingRules } from '../../../lib/validatorRules/product_shipping.js';
import { ProductImprintDataRules } from '../../../lib/validatorRules/product_imprint_data.js';
import { ProductVariationPriceRules } from '../../../lib/validatorRules/product_variation_pricing.js';
import { ProductAdditionalChargesRules } from '../../../lib/validatorRules/product_additional_charge.js';


// import  Headers
import { ProductInformationHeaders } from '../../../lib/headers/product_information.js'
import { ProductPriceHeaders } from '../../../lib/headers/product_price.js'
import { ProductImprintDataHeaders } from '../../../lib/headers/product_imprint_data.js'
import { ProductImageHeaders } from '../../../lib/headers/product_images.js'
import { ProductShippingHeaders } from '../../../lib/headers/product_shipping.js'
import { ProductAdditionalChargeHeaders } from '../../../lib/headers/product_additional_charge.js'
import { ProductVariationPricingHeaders } from '../../../lib/headers/product_variation_pricing.js'

let arrHeader = [];

// Step Status
const ValidationRunning = 'validation_running';
const ValidationCompleted = 'validation_completed';
const ImportRunning = 'import_in_progress';
const UploadPending = 'upload_pending';
let fileTypes =
[
    { id: 'ProductInformation', name: 'Product Information', isDone: false, isActive: true, header: ProductInformationHeaders, collection: CollProductInformation },
    { id: 'ProductPrice', name: 'Product Pricing', isDone: false, isActive: false, header: ProductPriceHeaders, collection: CollProductPrice },
    { id: 'ProductImprintData', name: 'Imprint Data', isDone: false, isActive: false, header: ProductImprintDataHeaders, collection: CollProductImprintData },
    { id: 'ProductImage', name: 'Image', isDone: false, isActive: false, header: ProductImageHeaders, collection: CollProductImage },
    { id: 'ProductShipping', name: 'Shipping', isDone: false, isActive: false, header: ProductShippingHeaders, collection: CollProductShipping },
    { id: 'ProductAdditionalCharges', name: 'Additional Charges', isDone: false, isActive: false, header: ProductAdditionalChargeHeaders, collection: CollProductAdditionalCharges },
    { id: 'ProductVariationPrice', name: 'Variation Price', isDone: false, isActive: false, header: ProductVariationPricingHeaders, collection: CollProductVariationPrice }
];

let secoundTimeValidate = [];
Template.validation.events({
    'click #validation_start' (event) {
        Meteor.validatorFunctions.getCurrentRunningUploadJob();
    },
    'click #proceed_to_next' (event) {
        Meteor.validatorFunctions.proceedToNext();
    },
    'click #import_start' (event) {
        Meteor.validatorFunctions.importStart();
    },
    'click #validationAbortBtnId' (event) {
        swal({
                title: "Are you sure?",
                text: "All validation will be stopped and you have to start again",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Abort it!",
                closeOnConfirm: true
            },
            function(isConfirm) {
                if(isConfirm)
                {
                  let job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
                  let guid=job._id;
                  var query = {
                      "$set": {
                          "stepStatus":UploadPending
                      }
                  };
                  job['arrFileObj']=[];
                  $.each(fileTypes, function(index, value) {
                      if(job[value.id])
                      {
                        query["$set"][value.id]=job[value.id];
                        query["$set"][value.id]['validateStatus']='pending';
                      }
                  });
                  //console.log(query);
                  let updResult = CollUploadJobMaster.update({_id: guid}, query,function(err,result){
                    if(!err)
                    {

                        Router.go("/");
                    }
                  });
                }
            });
    },
    'click #validationCompletedAbortBtnId' (event) {
        swal({
                title: "Are you sure?",
                text: "All validation are successfully completed. you have to start again",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Abort it!",
                closeOnConfirm: true
            },
            function(isConfirm) {
                if(isConfirm)
                {
                  let qry={owner:Meteor.userId(),"masterJobStatus":"running","stepStatus":ValidationCompleted};
                  jobQueue = CollUploadJobMaster.find(qry).fetch();
                  //console.log(jobQueue);
                  jobQueue=jobQueue[0];

                  let guid=jobQueue._id;
                  var query = {
                      "$set": {
                          "stepStatus":UploadPending
                      }
                  };
                  jobQueue['arrFileObj']=[];
                  $.each(fileTypes, function(index, value) {
                      if(jobQueue[value.id])
                      {
                        query["$set"][value.id]=jobQueue[value.id];
                        query["$set"][value.id]['validateStatus']='pending';
                      }
                  });
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


Template.validation.onRendered(function() {
  // Meteor.call("test" , function(error,success){
  //   if(error)
  //   {
  //     console.log(error);
  //
  //   }
  //   else {
  //     console.log("success call");
  //   }
  // });
});

Template.validation.onCreated(function() {
    this.filetypes = new ReactiveVar(fileTypes);


    Meteor.validatorFunctions.startValidation();

    //$('#validation_start').click();
    /*
    Meteor.startup(() => {
      //
    });
    */
    this.jobQueue = new ReactiveVar({});
    setTimeout(function(){
      //jobdata = Template.instance().jobQueue.get();
      CurrentValidation=Meteor.validatorFunctions.startValidation(function(CurrentValidation){
          if(CurrentValidation!='')
          {
            Meteor.validatorFunctions.onClickFindInValidData(CurrentValidation);
          }
      });
    },2000);

});

let runningStatusSet=0;

Template.validation.helpers({
    filetypes() {
        return Template.instance().filetypes.get();
    },
    // This is for fornt-end status display step-2
    jobQueue() {
        let job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
        if(!job)
        {
          Meteor.validatorFunctions.startValidation();
          job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
        }
        else {
            //console.log(job);
            let arrFileObj = [];
            job['arrFileObj']=[];
            $.each(Template.instance().filetypes.get(), function(index, value) {
                if(job[value.id])
                {
                  let fileId=Meteor.validatorFunctions.uploadedFileObj(job[value.id].id);
                  fileId['fileType']=value.name;
                  fileId['fileTypeId']=value.id;
                  fileId['validateStatus']=job[value.id].validateStatus;
                  //console.log(fileId);
                  arrFileObj.push(fileId);
                  job['arrFileObj'] = arrFileObj;  //arrFileObj[value.id] = fileId;
                }
            });
            //console.log( job);
            Template.instance().jobQueue.set(job);

            return Template.instance().jobQueue.get();
        }
        //return Meteor.validatorFunctions.getCurrentRunningUploadJob();
    },
    getFileObject(fileId)
    {
      return Meteor.validatorFunctions.uploadedFileObj(fileId);
    },
    isJobAvaialble(job)
    {
        if(job.arrFileObj && job.arrFileObj>0) {
          return true;
        }
        else {
          return false;
        }
    },
    isJobQueueStatusRunning(status)
    {
        //console.log("=========status====",status);
        if(status == "running") {
          return true;
        }
        else {
          return false;
        }
    },
    isStepStatusRunning(status)
    {
        if(status == ValidationRunning){
          return true;
        }
        else {
          return false;
        }
    },
    isJobHasAllPandingStatus()
    {
        if(runningStatusSet)
          return false;
        let job = Template.instance().jobQueue.get();
        //console.log("=======isJobHasAllPandingStatus========");
        //console.log(currentjobQueue);
        let flag=0;
        if(job && job.arrFileObj)
        {
          runningStatusSet=1;
          $.each(job.arrFileObj , function(index, value) {
              //console.log(value.validateStatus);
              if(value.validateStatus=="running" )
              {
                flag=0;
                return false;
              }
              if(value.validateStatus=="pending" )
              {
                ++flag;
              }
          });
          //console.log("=====flag=",flag,"==========");
          // there is no running and pending status then job will be completed
          if(job.arrFileObj.length==flag){
            //Meteor.validatorFunctions.onClickFindInValidData(newSheetName);
            Meteor.validatorFunctions.setJobQueusSheetValidationStatus("ProductInformation",job,"running");

            return true;
          }
          else {
            return false;
          }
        }
        runningStatusSet=1;
        return false;
    }
});

Meteor.UploadJob = {

}



Meteor.validatorFunctions = {
    instantiateJobQueue: async function(){
      // fetch owner job which import is running status
      let qry={owner:Meteor.userId(),"masterJobStatus":"running","stepStatus":ImportRunning};
      jobQueue = CollUploadJobMaster.find(qry).fetch()
      console.log("instantiateJobQueue")
      jobQueue=jobQueue[0]
      if(jobQueue) {
        await setImportJobQueue(jobQueue)
      }
    },
    importStart: function () {
      let qry = {owner: Meteor.userId(), 'masterJobStatus': 'running', 'stepStatus': ValidationCompleted}
      let job = CollUploadJobMaster.find(qry).fetch()
      job = job[0]
      // console.log(job);
      let guid = job._id
      var query = {
        '$set': {
          stepStatus: ImportRunning
        }
      }
      let updResult = CollUploadJobMaster.update({_id: guid}, query, {}, async function (error,result) {
        console.log("==========instantiateJobQueue====error===========")
        if (!error) {
          await Meteor.validatorFunctions.instantiateJobQueue()
        }
      })
      Router.go("/import");
    },
    onClickFindInValidData: function(sheetName) {
        if(sheetName=='')
          return false;
        //document.getElementById('validation_start').disabled = true
        //document.getElementById("myProgress").style.display = "block";
        // based on sheet name set Rules
        getHeaders(sheetName, function(err, sheetName) {
            if (err) {
                // display error msg for
                return false;
            }
            let extraRules=eval(sheetName+"Rules");

            findInValidData(sheetName, currentRule, extraRules,arrHeader[sheetName], function(err,sheetName, productData) {
                if (!err) {
                    let extraRules=eval(sheetName+"Rules");
                    //check column avaialble or not
                    let columnName = extraRules[currentRule].columnName;
                    // set column highLight column
                    $.each(arrHeader[sheetName], function(index, value) {
                        //console.log("===========");
                        //console.log(value.colHeaders);
                        if(value.colHeaders=='undefined')
                        {
                          delete(arrHeader[sheetName][index]);
                          //arrHeader[sheetName][index].renderer = errorRenderer;
                        }
                        else if(value.colHeaders==extraRules[(currentRule)].columnName)
                        {
                          arrHeader[sheetName][index].renderer = errorRenderer;
                        }
                        else {
                          if(arrHeader[sheetName][index].colHeaders!="guid")
                            delete(arrHeader[sheetName][index].renderer);
                        }
                    });
                    //console.log(arrHeader[sheetName]);
                    renderHandsonTable(sheetName,productData, arrHeader[sheetName], divNameOfhandsontable);
                }
            });
        });
    },
    proceedToNext: function() {

        document.getElementById('validation_start').disabled = false;
        Meteor.validatorFunctions.onClickFindInValidData(CurrentValidation);
        //document.querySelector("#productData").remove();
    },
    getCurrentRunningUploadJob:function(){
      //console.log(Meteor.userId());
      let qry={owner:Meteor.userId(),"masterJobStatus":"running","stepStatus":ValidationRunning};
      jobQueue = CollUploadJobMaster.find(qry).fetch();
      //console.log(jobQueue);
      currentjobQueue=jobQueue[0];
      return jobQueue[0];
    },

    uploadedFileObj:function(fileId){
      //console.log(Meteor.userId());
      //let qry={userId:Meteor.userId(),_id:fileId};
      let qry={_id:fileId};
      let fileObj = Csvfiles.find(qry).fetch();
      return fileObj[0];
    },
    setNextValidation:function(sheetName) {

      job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
      console.log(secoundTimeValidate);
      if(secoundTimeValidate[sheetName])
      {
        // update completed status for current running job
        Meteor.validatorFunctions.setJobQueusSheetValidationStatus(sheetName,job,"completed",function(){
          console.log("===========set Job Queus Sheet Status callback====");
          console.log();
            Meteor.validatorFunctions.startValidation(function(newSheetName){
              console.log("===========newSheetName callback====");
              console.log(newSheetName);
              if(newSheetName!='')
              {
                CurrentValidation=newSheetName;currentRule=0;
                Meteor.validatorFunctions.onClickFindInValidData(newSheetName);
              }
            });
        });
      }
      else {
        CurrentValidation=sheetName;currentRule=0;
        secoundTimeValidate[sheetName]=true;
        Meteor.validatorFunctions.onClickFindInValidData(sheetName);
      }

      //console.log("============="+updResult+"==========");

      return false;
    },
    setJobQueusSheetValidationStatus:function(sheetName,job,status,callback){
      let jobStatusField = sheetName+".validateStatus";
      var query = {
          "$set": {
              [jobStatusField]: status
          }
      };
      let guid=job._id;
      console.log("=======guid==========",guid,"::",status);
      let updResult = CollUploadJobMaster.update({_id: guid}, query);

      if(callback)
      {
        callback();
      }
    },
    setJobQueusSheetRuleStatus:function(sheetName,ruleIdx){
      job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
      let jobStatusField = sheetName+".currentRuleIndex";
      var query = {
          "$set": {
              [jobStatusField]: ruleIdx
          }
      };
      let guid=job._id;
        //console.log("=======guid==========",guid,"::",status);
      let updResult = CollUploadJobMaster.update({_id: guid}, query);
    },
    updateJobQueueMainStatus:function(job){
      let guid=job._id;
      var query = {
          "$set": {
              "stepStatus":ValidationCompleted
              //step2status: "completed"
          }
      };
      let updResult = CollUploadJobMaster.update({_id: guid}, query);
    },
    startValidation:function(callback){
        job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
        //console.log(job);
        if(!job)
        {
          return "";
        }
        else {
            let arrFileObj = [];
            job['arrFileObj']=[];

            $.each(fileTypes, function(index, value) {
                //console.log(value.id);
                if(job[value.id])
                {
                  let fileId=Meteor.validatorFunctions.uploadedFileObj(job[value.id].id);
                  fileId['fileTypeId']=value.id;
                  arrFileObj.push(fileId);
                  job['arrFileObj'] = arrFileObj;  //arrFileObj[value.id] = fileId;
                }
            });

            //console.log(job.arrFileObj);
            let allCompletedflag=1;
            $.each(job.arrFileObj , function(index, value) {
                //console.log("=====Status==="+job[value.fileTypeId].validateStatus);
                if(job[value.fileTypeId].validateStatus=="running")
                {
                  CurrentValidation=value.fileTypeId;
                  allCompletedflag=0;
                  return false;
                }
                else if(job[value.fileTypeId].validateStatus=="pending")
                {
                  // update completed status for current running job
                  Meteor.validatorFunctions.setJobQueusSheetValidationStatus(value.fileTypeId,job,"running");
                  job[value.fileTypeId].validateStatus="running";
                  if(CurrentValidation=="")
                  {
                    CurrentValidation=value.fileTypeId;
                  }
                  allCompletedflag=0;
                  return false;
                }
            });

            // there is no running and pending status then job will be completed
            if(allCompletedflag==1)
            {
              Meteor.validatorFunctions.updateJobQueueMainStatus(job);
              CurrentValidation='';
            }
        }
        if(callback)
        {
          callback(CurrentValidation);
        }
        return CurrentValidation;
    }
}

function setImportJobQueue (jobData) {
  return new Promise((resolve, reject) => {
    try {
      if (Meteor.isClient) {
        let myJobs = JobCollection('OBImportJobQueue')
        Meteor.startup(function () {
          Meteor.subscribe('allJobs')
          // Create a job:
          var job = new Job(myJobs, 'ImportToPDM', // type of job
            jobData
          )
          // Set some properties of the job and then submit it
          job.priority('normal')
            .retry({ retries: 5,
              wait: 15 * 60 * 1000 })  // 15 minutes between attempts
            .delay(10 * 1000)     // Wait an 30 second before first try
            .save()               // Commit it to the server

          // Any job document from myJobs can be turned into a Job object
          job = new Job(myJobs, myJobs.findOne({}))

          // Or a job can be fetched from the server by _id
          myJobs.getJob(_id, function (err, job) {
            // If successful, job is a Job object corresponding to _id
            // With a job object, you can remotely control the
            // job's status (subject to server allow/deny rules)
            // Here are some examples:
            job.pause()
            job.cancel()
            job.remove()
            // etc...
          })
        })
        resolve('JobQueue Generated')
      }
    } catch (e) {
      reject('job not generate')
    }
  })
}

function findjobQueueData() {
    //console.log(currentRuleIdx,"===========",arrRules.length);
    let query = {sku:""};
    console.log(query);
    let result = CollProductInformation.find(query).fetch();
    console.log(result);

}

// display error msg hide/show
function displayErrorMsg(flag, msg) {
    //$("#divrunning").
    console.log("========",currentValidationName);
    let row = $('#errorContainer').remove().clone();
    $('#div'+currentValidationName).after(row);
    var errorMsg = $("#errorDiv").find("#errorStr");
    //console.log("====================flag=",flag);

    if(errorMsg)
    {
      errorMsg.html(msg +", please provide valid data for the highlighted rows.");
      if(document.getElementById("mydiv"))
        document.getElementById("mydiv").style.display = !flag ? "none" : "block";
      if(document.getElementById("errorDiv"))
        document.getElementById("errorDiv").style.display = !flag ? "none" : "block";
      if(document.getElementById("buttonDivProceed"))
        document.getElementById("buttonDivProceed").style.display = !flag ? "none" : "block";
    }
}

let errorRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    //console.log($(row:first-child));
    $(td).attr("style","border:1px solid "+invalidColumnColor);
    $(td).focus();
};

let hideColumnRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    //console.log(td);
    //$(".htCore").find("thead tr:first-child th:nth-child(2)").attr("style","display:none");
    //$(".htCore").find("thead tr:first-child th:nth-child(3)").attr("style","border-left:1px solid #CCC");
    //$(".htCore").find("table thead tr td:nth-child("+col+")").attr("style","display:none");
    //console.log($(".htCore").find('tr:'));
    //$(td).attr("style","display:none");
    //$(td).hidden=true;
    //$(".ht_clone_top_left_corner").attr("style","display:none");
    //document.querySelector('.ht_clone_top').style.display = "none";
    //document.querySelector('.ht_clone_left').style.display = "none";
    //document.querySelector('.ht_clone_corner').style.display = "none";
    //document.querySelector('.ht_master').style.display = "";
};
let currentDataObj=null;
function renderHandsonTable(sheetName,dataObject, headers, eleName) {
    //console.log(arrHeader[sheetName]);
    currentDataObj=dataObject;
    let hotSettings = {
        data: dataObject,
        columns: arrHeader[sheetName],
        stretchH: 'all',
        //width: '100%',
        autoWrapRow: true,
        height: 200,
        //maxRows: 22,
        rowHeaders: true,
        colHeaders: getHeadersValues(arrHeader[sheetName]),
        afterChange: function(changes, source) {
            updateProductData(changes, source);
        }
    };
    hotElement = document.querySelector('#' + eleName);
    hotElement.innerHTML='';
    if(hotElement)
    {
      objHandsontable = new Handsontable(hotElement, hotSettings);
      console.log("========objHandsontable=========",currentRule);
      objHandsontable.selectCell(1,currentRule);
      //$(".htCore").find("thead tr:first-child th:nth-child(2)").attr("style","display:none");
      //$(".htCore").find("thead tr:first-child th:nth-child(3)").attr("style","border-left:1px solid #CCC");
    }
}

function updateProductData(changes, source) {
    if (!changes) {
        return;
    }
    //$(".htCore").find("thead tr:first-child th:nth-child(2)").attr("style","display:none");
    //$(".htCore").find("thead tr:first-child th:nth-child(3)").attr("style","border-left:1px solid #CCC");

    //console.log("=====3231313132============");
    //console.log(currentDataObj);
    let cellChange = {
        'rowIndex': changes[0][0],
        'columnIndex': changes[0][1],
        'oldValue': changes[0][2],
        'newValue': changes[0][3]
    };
    if (cellChange.oldValue != cellChange.newValue) {
        let _id = currentDataObj[cellChange.rowIndex]._id ;//objHandsontable.getDataAtCell(cellChange.rowIndex, 0);
        //console.log(_id);
        let column_name = cellChange.columnIndex.split(".").pop();
        console.log(cellChange);
        console.log(column_name);
        updateData(_id, column_name, cellChange.newValue,function(msg,error,res){
            console.log("=====updateProductData=callback=======",msg);
            //console.log(objHandsontable);
            //console.log(objHandsontable.propToCol(cellChange.rowIndex));
            //var errorMsg = $("#errorDiv").find("#errorStr");
            let strMsg = error.message + ", you can not change data.";
            //errorMsg.html();
            delete(secoundTimeValidate[currentValidationName]);
            toastr.clear();
            toastr.info(strMsg);

            objHandsontable.setDataAtCell(cellChange.rowIndex,objHandsontable.propToCol(cellChange.columnIndex),cellChange.oldValue);
        });
    }
}

function updateData(guid, columnName, newValue, callback) {
    if (fromValidate == 'mongo') {
        updateDataMongo(guid, columnName, newValue, callback);
    } else {
        updateDataES(guid, columnName, newValue, callback);
    }
}

function updateDataMongo(guid, columnName, newValue, callback) {
    let setVal = {};
    var query = {
        "$set": {
            [columnName]: newValue
        }
    };
    console.log(query);
    let dataResult = eval("Coll"+currentValidationName).update({
        _id: guid
    }, query, { validate: true, validationContext: "updateForm" }, function(error1, res) {
        if (error1) {
            console.log("======error update====");
            //console.log(error1.message);
            //console.log(res);
            //objHandsontable.selectCell(row,col);
            //console.log("======col===",col,"====row=", row);
            // Prepare Simple Schema validation msg

            //displayErrorMsg(true, strMsg);
            callback(error1.message,error1,res);
        } else {
            console.log("======result update====");
            //console.error(res);
        }
    });
    document.getElementById("buttonDivProceed").style.display = "block";
}

function updateDataES(guid, columnName, newValue) {
    var query = {
        "doc": {
            [columnName]: newValue
        }
    };
    $.ajax({
        async: false, // set async false to wait for previous response
        url: esUrl + "product/" + guid + "/_update",
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(newDataQuery) + '\n',
        success: function(data) {
            //console.log(data);
            document.getElementById("buttonDivProceed").style.display = "block";
            alert(" updated successfully ");
            document.getElementById("buttonDivProceed").style.display = "block";
        },
        error: function(err) {
                console.log(err);
            }
            //data: query
    });
}

function getHeaders(sheetName, callbackHeaderName) {
    //console.log("getHeaders_Call",arrHeader[sheetName]);
    if (arrHeader[sheetName] && arrHeader[sheetName].length > 0) {
        callbackHeaderName(null, sheetName);
        return true;
    } else {
        productMapping = setColumnHeader(sheetName, eval(sheetName+"Headers"));
        callbackHeaderName(null, sheetName);
    }
    /*
    if(headers.length>0)
    {
      callbackHeaderName(null,sheetName);
      return true;
    }
    $.ajax({
      url: esUrl+"product/_mapping",
      type: 'get',
      dataType: 'json',
      success: function(data) {
          //alert("Success");
          setColumnHeader(sheetName,data);
          callbackHeaderName(null,sheetName);
      },
      error: function(data) {
          // should be only one item in hits
      }
    });
    */
}

// function setColumnHeader(sheetName,productMapping)
// {
//     if(productMapping.pdmrawdata.mappings.product.properties)
//     {
//       headers.push({colHeaders:"guid",type:'text',data:'_id'});
//       $.each(productMapping.pdmrawdata.mappings.product.properties, function(index, value) {
//         headers.push({colHeaders:""+index,type:value.type,data:'_source.'+index});
//       });
//     }
// }
function setColumnHeader(sheetName, sheetHeaders) {
    let appendString = '';
    if (fromValidate == 'es') {
        appendString = "_source.";
    }
    if (sheetHeaders) {
        //console.log(arrHeader[sheetName]);
        if(!arrHeader[sheetName])
        {
          arrHeader[sheetName]=[];
        }
        //arrHeader[sheetName].push({ colHeaders: "guid", type: 'text', data: '_id','renderer' :hideColumnRenderer });
        $.each(sheetHeaders, function(index, value) {
            if(value.column!=undefined){
                arrHeader[sheetName].push({ colHeaders: "" + value.column, type: value.type, data: appendString + value.column });
            }
        });

    }
}

function getHeadersValues(arrColumnHeader) {
    // this function extract only column value
    return arrColumnHeader.map(function(a) { return a.colHeaders; })
}


function findInValidData(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback) {
    console.log(currentRuleIdx, "====1=======", arrRules.length,"=========",sheetName);
    currentValidationName=sheetName;
    if (arrRules.length <= currentRuleIdx) {
        displayErrorMsg(false, '');
        setTimeout(function(){$("[id*='errorSpinner"+sheetName+"']").hide();},200);
        Meteor.validatorFunctions.setNextValidation(sheetName,currentRuleIdx);
        //document.getElementById("validation_successful").style.display = "block";
        // all rules are completed
        return false;
    }
    $("[id*='errorSpinner"+sheetName+"']").show();
    setTimeout(function(){$("[id*='errorSpinner"+sheetName+"']").show();},200);
    if(currentRuleIdx<=0)
    {
      setValidationProgress(sheetName,currentRuleIdx, arrRules.length);
    }
    delete(sheetHeaders[(currentRule + 1)].renderer);
    if (fromValidate == 'mongo') {
        findInvalidDataFromMongo(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback);
    } else {
        findInvalidDataFromES(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback);
    }

}

function findInvalidDataFromMongo(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback) {
    //console.log(currentRuleIdx,"===========",arrRules.length);
    let query = arrRules[currentRuleIdx].qryMongo;
    query['fileID']=currentjobQueue[sheetName].id;
    //query.push({fileID:currentjobQueue[sheetName].id});
    //console.log(query);
    //console.log("============InvalidDataFromMongo=========");
    //console.log(currentjobQueue);
    //job = Meteor.validatorFunctions.getCurrentRunningUploadJob();


    let result = eval("Coll"+sheetName).find(query).fetch();
    //console.log(result);
    if (result.length <= 0) {
        // continue checking with next set of rules
        currentRule = ++currentRuleIdx;
        Meteor.validatorFunctions.setJobQueusSheetRuleStatus(sheetName,currentRule);
        setValidationProgress(sheetName,currentRuleIdx, arrRules.length);
        findInValidData(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback);

        setTimeout(function(){$("[id*='errorSpinner']").hide();},200);
        setTimeout(function(){$("[id*='errorSpinner"+sheetName+"']").show();},200);
    } else {
        //console.log($("div[id|='errorSpinner']"));
      //  $("div[id|='errorSpinner']").hide();

        displayErrorMsg(true, arrRules[currentRuleIdx].errorString);
        result = result.map(function(a) { return a; });
        callback(null,sheetName, result,sheetHeaders);
        setTimeout(function(){$("[id*='errorSpinner']").hide();},500);
    }
}

function setValidationProgress(sheetName,currentRuleIdx, ProductInformationLength) {

    let elem = document.getElementById("myBar");
    if(elem)
    {
      let width = Math.round(currentRuleIdx / ProductInformationLength * 100);
      elem.style.width = width + '%';
      elem.innerHTML = width * 1 + '%';
      //alert(width);
      job = Meteor.validatorFunctions.getCurrentRunningUploadJob();
      //console.log(job[sheetName].id);
      Csvfiles.update(job[sheetName].id, {
              $set: { 'validationProgress': width }
          },
          // function(e, res) {
          //     if (progress < 100)
          //         streamer.resume();
          //     else
          //         streamer.abort()
          // }

      );

      setTimeout(function(){$("[id*='errorSpinner"+sheetName+"']").show();},500);
    }

    /*
    Meteor.call('products.insertCSVData', 'iZrfNK4XoCsxGPhA3', function() {
        //insertCSVData(fileID, results.data, function(err, res) {
        // update file progress
        Csvfiles.update('iZrfNK4XoCsxGPhA3', {
                $set: { 'validationProgress': width }
            },
            // function(e, res) {
            //     if (progress < 100)
            //         streamer.resume();
            //     else
            //         streamer.abort()
            // }
        );
    });
    */
}


function findInvalidDataFromES(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback) {
    // Find unValid Data
    $.ajax({
        url: esUrl + "product/_search",
        type: 'post',
        data: JSON.stringify(arrRules[currentRule].fn()) + "\n",
        dataType: 'json',
        success: function(data) {

            //when no more in valid data rule will be changed
            if (data.hits.hits.length == 0) // if no errors found
            {
                Meteor.validatorFunctions.setJobQueusSheetRuleStatus(sheetName,currentRule);
                // continue checking with next set of rules
                currentRule = ++currentRuleIdx;

                setValidationProgress(sheetName,currentRuleIdx, arrRules.length);

                console.log(currentRuleIdx);

                if (currentRuleIdx >= arrRules.length) {
                    document.getElementById("validation_successful").style.display = "block";
                } else {

                    findInValidData(sheetName, currentRuleIdx, arrRules,sheetHeaders, callback);
                }

                return false;
            } else // found some records that have invalid data
            //alert(23);
                displayErrorMsg(true, arrRules[currentRuleIdx].errorString);

            callback(null,sheetName, data.hits.hits,sheetHeaders);
        },
        error: function(data) {
            // should be only one item in hits
            callback(data.hits.hits,sheetName,null,sheetHeaders);
        }
    });
}
