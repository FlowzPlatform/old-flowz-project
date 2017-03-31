// Import needed templates
import '../ui/body.js';
import '../ui/history/history.js';


Router.route('/', function() {
    this.render('readCSV');
});

Router.route('/history', function() {
    this.render('history');
});

Router.route('/validation', function() {
    this.render('validation');
});