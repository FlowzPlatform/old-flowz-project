
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './viewBidsDetail.html';

import { Csvfiles } from '../../api/collections.js';



Template.viewBidsDetail.onRendered(function() {

})
Template.registerHelper('incremented', function (index) {
    index++;
    return index;
});
