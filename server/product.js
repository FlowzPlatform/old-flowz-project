import { Meteor } from 'meteor/meteor';
import { Products } from '../imports/api/collections.js';
import { Csvfiles } from '../imports/api/collections.js';

Meteor.methods({
    'products.insertCSVData': function(data) {
        return Products.batchInsert(data);
    },
    'products.insertCSVDetails': function(data) {
        return Csvfiles.insert(data);
    },
    'products.updateCSVDetails': function(id, data) {
        return Csvfiles.update(id, { $set: data });
    }
});