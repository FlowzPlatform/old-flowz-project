// Cities = new Rethink.Table('cities');
// r = Rethink.r;


import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './bidding.html';

import { Csvfiles } from '../../api/collections.js';



if (Meteor.isClient) {

    Template.post.helpers({
        allBids: function() {

            console.log(Meteor.userId());
            console.log('Number of players:', Bidding.count().run());
            //  return Posts.find().fetch();
            return Bidding.run();
        },
    })

    Template.posts.helpers({

      posts: function () {
        return Posts.find({'owner' : Meteor.userId()}, { sort: { createdAt: -1 } });
      }
    })

    Template.post.events({
        'click #endBidManually': function() {
            console.log(this)
            let carryForowordThis = this;
            console.log(Meteor.userId());
            swal({
                text: "Are you sure you want to end this auction manually , the default end date is " + this.EndBidDate,
                title: "You will not be able to Undo this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, End it!",
                closeOnConfirm: true,
                html: false
            }, function() {
                Posts.update({
                    _id: carryForowordThis._id
                }, {
                    $set: {
                        isBidEnds: 'yes'
                    }
                });
                var title = Posts.find({
                    _id: carryForowordThis._id
                }).fetch()[0].title;
                Bidding.filter({
                    'title': title
                }).update({
                    'isBidEnds': 'yes'
                }).run();
            });

        },
        'click #viewBidsDetail': function() {
            Router.go('viewBidsDetail', {
                _id: this._id._str
            });
        }
    })

    Template.post.onRendered(function() {

        $(".jump-response").each(function() {
            var hue = 'rgb(' + (Math.floor((256 - 99) * Math.random()) + 10) + ',' + (Math.floor((256 - 99) * Math.random()) + 10) + ',' + (Math.floor((256 - 99) * Math.random()) + 10) + ')';
            $(this).css("background-color", hue);
        });

        var product = Posts.findOne({
            _id: this.data._id
        });
        var endtime = product.EndBidDate;
        var now = new Date();
        var diff = endtime.getTime() / 1000 - now.getTime() / 1000;
        var clock;
        if (moment().isAfter(endtime)) {
            if (product.ended == "false" || product.ended == undefined) {
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
    })


    Template.addPost.events({

        'click #savetoRethink': function(e) {

            let rethinkbidPlaceObj = {};

            var title = AutoForm.getFieldValue("title", "add");
            var content = AutoForm.getFieldValue("content", "add");
            //var bidMode = AutoForm.getFieldValue("bidMode", "add");
            var currency = AutoForm.getFieldValue("currency", "add");
            var StartingBid = AutoForm.getFieldValue("StartingBid", "add");
            var UpperLimitBid = AutoForm.getFieldValue("UpperLimitBid", "add");
            var BidIncrementedBy = AutoForm.getFieldValue("BidIncrementedBy", "add");
            var EndBidDate = AutoForm.getFieldValue("EndBidDate", "add");
            var endOfAuctionMethod = AutoForm.getFieldValue("endOfAuctionMethod", "add");
            var createdAt = AutoForm.getFieldValue("createdAt", "add");
            var updatedAt = AutoForm.getFieldValue("updatedAt", "add");
            var owner = AutoForm.getFieldValue("owner", "add");
            var picture = AutoForm.getFieldValue("picture", "add");


            rethinkbidPlaceObj.title = title;
            rethinkbidPlaceObj.content = content;
            //rethinkbidPlaceObj.bidMode = bidMode;
            rethinkbidPlaceObj.currency = currency;
            rethinkbidPlaceObj.StartingBid = StartingBid;
            rethinkbidPlaceObj.UpperLimitBid = UpperLimitBid;
            rethinkbidPlaceObj.BidIncrementedBy = BidIncrementedBy;
            rethinkbidPlaceObj.EndBidDate = EndBidDate;
            rethinkbidPlaceObj.endOfAuctionMethod = endOfAuctionMethod;
            rethinkbidPlaceObj.createdAt = new Date();
            rethinkbidPlaceObj.updatedAt = new Date();
            rethinkbidPlaceObj.owner = Meteor.userId();
            rethinkbidPlaceObj.isBidEnds = "no";
            rethinkbidPlaceObj.picture = picture;
            rethinkbidPlaceObj.bids = [];

            console.log(rethinkbidPlaceObj);
            //Bidding.insert(rethinkbidPlaceObj).run();


            Bidding.insert(rethinkbidPlaceObj).run();
          //  alert('Number of players:', Bidding.count().run());
            window.location.href = "http://localhost:3000/bidding"

            // return false;

        },

    })
}
