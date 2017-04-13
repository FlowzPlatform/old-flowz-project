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

Router.route('/schema', function() {
    this.render('schema');
});