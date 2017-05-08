// Import needed templates
//import '../ui/body.js';
//import '../ui/history/history.js';
//import '../ui/landing/landing.js';

import { CollUploadJobMaster } from '../api/collections.js';


Router.route('/', function() {
    this.render('landing');
});

Router.route('/upload', {
    name: 'upload',
    path: '/upload/:id?',
    template: 'readCSV',
    data: function() {
        return CollUploadJobMaster.findOne({ owner: Meteor.userId(), masterJobStatus: 'running' })
    },
    onBeforeAction: function() {
        let obj = CollUploadJobMaster.findOne({ owner: Meteor.userId(), masterJobStatus: 'running' })

        if (obj != undefined) {
            this.next();
        } else {
            Router.go('/');
        }
    }
});

// Router.route('/upload/:id', function() {
//     this.render('readCSV');
// });

Router.route('/history', function() {
    this.render('history');
});

Router.route('/validation', function() {
    this.render('validation');
});

Router.route('/import', function() {
    this.render('import');
});

Router.route('/rfq', function() {
    this.render('rfq');
});

Router.route('/bidding' , function () {
  this.render("bidding")
})

Router.route("viewBidsDetail", {
 path: "/bidding/:_id",
 // waitOn: function() {
 //   return [subscribe('posts')];
 // },
 data: function() {
   console.log(Posts.findOne(new Meteor.Collection.ObjectID(this.params._id)));
   return {
   viewDetails: Posts.findOne(new Meteor.Collection.ObjectID(this.params._id), {
     sort: {
       createdAt: -1
     }
   })
 }
 }
});

Router.route('/allBids' , function () {
  this.render("allBids")
})

// return this.route("dashboard", {
//   path: "/dashboard",
//   waitOn: function() {
//     return [subs.subscribe('posts'), subs.subscribe('comments'), subs.subscribe('attachments')];
//   },
//   data: function() {
//     return {
//       posts: Posts.find({'owner' : Meteor.userId()}, {
//         sort: {
//           createdAt: -1
//         }
//       }).fetch()
//     };
//   }
// });
