this.Posts = new Meteor.Collection('auction');

//export const CollPosts = new Mongo.Collection('posts');


Schemas.Posts = new SimpleSchema({
  title: {
    type: String,
    max: 60,
    label: "Bid Title",
  },
  content: {
    type: String,
    autoform: {
      rows: 5
    },
    label: "Description",
  },
  // bidMode: {
  //     type: String,
  //     optional: true,
  //     label: 'Bidding Mode',
  //     autoform: {
  //        options: [
  //           {
  //              label: 'Product',
  //              value:'product'
  //           },
  //           {
  //              label: 'Service',
  //              value: 'service'
  //           }
  //        ]
  //     }
  //  },
  currency: {
      type: String,
      optional: true,
      label: 'Choose a Currency',
      autoform: {
         options: [
            {
               label: 'USD ($)',
               value:'$'
            },
            {
               label: 'EUR (€)',
               value: '€'
            },
            {
               label: 'JPY (¥)',
               value: '¥'
            },
            {
               label: 'AUD ($)',
               value: '$'
            },
            {
               label: 'CAD ($)',
               value: '$'
            },
            {
               label: 'CHF (Fr) ',
               value: 'Fr'
            },
            {
               label: 'INR (₹)',
               value: '₹'
            },
            {
               label: 'RUB (₽)',
               value:'₽'
            },

         ]
      }
   },
  StartingBid: {
    type: Number,
    label: "Initial Bid Price",
  },
  UpperLimitBid: {
    type: Number,
    optional : true,
    label: "Ceiling Bid Price (optional)",
  },
  BidIncrementedBy : {
    type : Number,
    label : "Increment Bids by"
  },
  EndBidDate: {
    type: Date,
    label: "Bid Ends on",
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
  currentBid: {
    type: Number,
    optional: true,
    autoValue: function() {
      var StartingBid = this.field('StartingBid');
      if (StartingBid.isSet == true) {
        return StartingBid.value
      }
    }
  },
  picture: {
    type: String,
    label: "Image (optional)",
    // optional : "true",
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Attachments'
      }
    }
  },
  endOfAuctionMethod: {
      type: String,
      label: 'End of Auction Method',
      autoform: {
         options: [
            {
               label: 'Auto Assign to the top bidder',
               value: 1
            },
            {
               label: 'Receive email/notification at the End of bidding',
               value: 2
            }
         ]
      }
   },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  },
  isBidEnds: {
    type: String,
    optional: true,
    autoValue: function() {

      if (this.isInsert == true) {
        return 'no'
      }
    }
  },






// Bids Array schema START


  bids: {
    type: [Object],
    optional: true
  },
  'bids.$.auctionId': {
        type: String  // mongo document id
  },
  'bids.$.bidderId': {
        type: String
  },
  'bids.$.biddingTime': {
        type: Date,
        autoValue: function() {
            return new Date();
        }
  },
  'bids.$.title': {
      type: String
  },
  'bids.$.previousBid': {
      type: Number
  },
  'bids.$.currentBid': {
      type: Number
  },
  'bids.$.currency': {
      type: String
  },
  'bids.$.StartingBid': {
      type: Number
  },
  'bids.$.content': {
      type: String
  },
  'bids.$.incrementedBy': {
      type: Number
  },
  'bids.$.auctionEndTime': {
      type: Date
  },
  'bids.$.isHighest': {
        type: String
  },
  'bids.$.isWinner': {
        type: String
  },
});

//Posts.attachSchema(Schemas.Posts);

// Posts.helpers({
//   author: function() {
//     var ref, ref1, ref2, user;
//     user = Meteor.users.findOne(this.owner);
//     if (((user != null ? (ref = user.profile) != null ? ref.firstName : void 0 : void 0) != null) && (user != null ? (ref1 = user.profile) != null ? ref1.lastName : void 0 : void 0)) {
//       return user.profile.firstName + ' ' + user.profile.lastName;
//     } else {
//       return user != null ? (ref2 = user.emails) != null ? ref2[0].address : void 0 : void 0;
//     }
//   }
// });



  Posts.allow({
    'insert': function (doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    },
    'update': function (doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    },
    remove: function(doc){
    return true;
  }
  });
