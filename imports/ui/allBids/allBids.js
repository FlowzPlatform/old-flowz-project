var myJobs = JobCollection('myJobQueue');

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './allBids.html';

import { Csvfiles } from '../../api/collections.js';

Meteor.startup(function() {
    Meteor.subscribe('allJobs');
})



Template.feed.onRendered(function() {

    var product = Posts.findOne({
        _id: this.data._id
    });
    console.log(this.data._id._str);
    var endtime = product.EndBidDate;
    console.log(endtime);

    // ########### first clock ########
    // var timeinterval;
    //
    // Meteor.startup(function() {
    //     var endtime = 'May 4 2017 14:50:30 UTC-0400';
    //
    //     timeinterval = setInterval(function() {
    //         Meteor.call("getCurrentTime", function(error, result) {
    //             Session.set("time", result);
    //           //  console.log(result);
    //             var t = getTimeRemaining(endtime);
    //             Session.set("t", t);
    //         });
    //     }, 1000);
    // });
    //
    // function getTimeRemaining(endtime) {
    //   //console.log(Date.parse(endtimee));
    //     var t = Date.parse(endtimee) - Session.get('time');
    //     var seconds = ("0" + Math.floor((t / 1000) % 60)).slice(-2);
    //     var minutes = ("0" + Math.floor((t / 1000 / 60) % 60)).slice(-2);
    //     var hours = ("0" + Math.floor((t / (1000 * 60 * 60)) % 24)).slice(-2);
    //     var days = Math.floor(t / (1000 * 60 * 60 * 24));
    //
    //   //  console.log(t)
    //     if (t <= 0)
    //         clearInterval(timeinterval);
    //
    //     return {
    //         'total': t,
    //         'days': days,
    //         'hours': hours,
    //         'minutes': minutes,
    //         'seconds': seconds
    //     };
    //
    // }
    //  ########### first clock #######

    var now = new Date();
    var diff = endtime.getTime() / 1000 - now.getTime() / 1000;
    var clock;

    if (moment().isAfter(endtime)) {
        if (product.ended == "false") {
            Posts.update({
                _id: this.data._id
            }, {
                $set: {
                    "ended": true
                }
            });
        }
        $('.bid').replaceWith("<h2> No more Bids</h2>");
        $('.clock').replaceWith("<h2> Ended</h2>");
    } else {
        clock = $('#' + this.data._id).FlipClock({
            clockFace: 'DailyCounter',
            autoStart: false,
            callbacks: {
                stop: function() {
                    $('.message').html('The clock has stopped!')
                }
            }
        });
        console.log(diff);
        clock.setTime(diff);
        clock.setCountdown(true);
        clock.start();;
    }
});





Template.autoBid.onCreated(function() {

    console.log(Session.get("bidNowObject"));
    var bidNowObj = Session.get("bidNowObject");

    //console.log(total);
})

Template.bidNow.onCreated(function() {

})





Template.countdown.helpers({
    t: function() {
        return Session.get("t");
    }
});

Template.body.helpers({
    ended: function() {
        console.log(Session.get("t").total <= 0);
        return Session.get("t").total <= 0;
    }
});

Template.feeds.helpers({
  posts: function () {
    return Posts.find({});
  },
  productCount: function() {
    return Posts.find().count()
  },
  setTimer: function(id, endDate){
    console.log(id, endDate);
    var countDownDate = new Date(endDate).getTime();

    var x = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      days = days < 10 ? '0'+days : days;
      hours = hours < 10 ? '0'+hours : hours;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      seconds = seconds < 10 ? '0'+seconds : seconds;

      // Display the result in the element with id="demo"
      document.getElementById("demo-clock" + id).innerHTML = "<p>Ends In: <span class='timings'>" + days + " : " + hours + " : "
      + minutes + " : " + seconds + "</span></p>";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo-clock" + id).innerHTML = "EXPIRED";
      }
    }, 1000);
  }

})
Template.feeds.events({

  'click .autoBid' : function(event){
     console.log('event');
     if (document.getElementById('autoBid' + this._id._str).checked) {
         $('.isAutobid' + this._id._str).css('display', 'block')
     }else{
         $('.isAutobid' + this._id._str).css('display', 'none')
     }
   },


    'click #list': function(event) {
      $(".col-md-4").addClass("col-md-12");
      $(".col-md-4").addClass("grid");
      $(".col-md-4").removeClass("col-md-4");
    },

    'click #grid': function(event) {
      $(".grid").addClass("col-md-4");
    //  $(".col-md-12").removeClass("col-md-12")
    },

    'click #bidNow': function(event, template) {
        console.log(this);
        console.log(event);
        Session.set("currentAuction", this);
        Session.set('itemId',event.target.name);
        console.log(Session.get('itemId'));
        var total = (Session.get("currentAuction").currentBid) + (Session.get("currentAuction").BidIncrementedBy);
        //  document.getElementById("title").innerHTML = this.title;
        var totalId = "totalBid"+this._id._str;
        console.log(totalId);
        document.getElementById(totalId).value = this.currency + " " + total.toFixed(2);
        //document.getElementById("totalBid").innerHTML = this.currency + " " + total;
        $('#bidNowModal'+Session.get('itemId')).modal('show');
    },



    'click .need': function(event) {
        var bidId = Session.get('itemId');
        console.log(bidId);
        if (event.target.checked == true) {
            $("#upperLimit"+bidId).removeAttr('disabled');
            $("#incrementedBy"+bidId).removeAttr('disabled');
        }else{
            $("#upperLimit"+bidId).attr('disabled','true');
            $("#incrementedBy"+bidId).attr('disabled','true');
        }
    },

    'click #save': function(e) {
        e.preventDefault();
        let currentAuction = Session.get("currentAuction");
        console.log(currentAuction.currentBid);
        console.log(currentAuction.BidIncrementedBy);
        var total = (currentAuction.currentBid) + (currentAuction.BidIncrementedBy);
        console.log(total);
        console.log(currentAuction);
        console.log('bidder ' + Meteor.userId());
        console.log("owner " + currentAuction._id);
        var objId = 'ObjectId('+currentAuction._id+')';
        console.log("objId" , new Meteor.Collection.ObjectID());
        // #### update current bid in mongo START
        Posts.update({
            _id: currentAuction._id
        }, {
            $set: {
                currentBid: total
            }
        })
        // #### update current bid in mongo END

        //#### update bids Array in mongo START
          Posts.update({
              _id: currentAuction._id
          }, {
              $push: {
                  bids: {
                      auctionId: currentAuction._id,
                      bidderId: Meteor.userId(),
                      biddingTime: new Date(),
                      title : currentAuction.title,
                      currentBid: total.toFixed(2),
                      previousBid : currentAuction.currentBid,
                      currency: currentAuction.currency,
                      StartingBid : currentAuction.StartingBid,
                      content : currentAuction.content,
                      incrementedBy : currentAuction.BidIncrementedBy,
                      auctionEndTime : currentAuction.EndBidDate,
                      isHighest: 'no',
                      isWinner:'no',
                  }
              }
          })
        //#### update bids Array in mongo END

        // #### update bids in rethink DB START
          var title = Posts.find({
              _id: currentAuction._id
          }).fetch()[0].title;
          Bidding.filter({
              'title': title
          }).update({
              'bids': r.row('bids').append({
                auctionId: currentAuction._id,
                bidderId: Meteor.userId(),
                biddingTime: new Date(),
                title : currentAuction.title,
                currentBid: total.toFixed(2),
                previousBid : currentAuction.currentBid,
                currency: currentAuction.currency,
                StartingBid : currentAuction.StartingBid,
                content : currentAuction.content,
                incrementedBy : currentAuction.BidIncrementedBy,
                auctionEndTime : currentAuction.EndBidDate,
                isHighest: 'no',
                isWinner: 'no',

              })
          }).run();
        // #### update bids in rethink DB END

        // //#### create a Job START
        //
        //   var job = new Job(myJobs, 'computeBid',
        //     {
        //         bidder: Meteor.userId(),
        //         bidId : currentAuction._id,
        //       currentBid : total,
        //       previousBid: currentAuction.currentBid
        //     }
        //   );
        //   job.priority('normal')
        //     .retry({ retries: 5,
        //       wait: 1*1*1000 })  //
        //     .delay(1*1*1000)     //
        //     .save();               //
        //   job = new Job(myJobs, myJobs.findOne({}));
        //
        //
        // // ##### create a job END
        let modalId = '#bidNowModal'+currentAuction._id
        $(modalId).modal('hide');
    }
  })
