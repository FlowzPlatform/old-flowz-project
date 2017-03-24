import { Meteor } from 'meteor/meteor';
import { Products } from '../imports/api/collections.js';
import { Csvfiles } from '../imports/api/collections.js';

Meteor.methods({
    'products.insertCSVData': function(fileID, datas) {
        let _data = [];
        datas.forEach(function(d) {
            _data.push({
                fileID: fileID,
                data: d,
                owner: Meteor.userId(),
                username: Meteor.user().username,
            });
        });
        return Products.batchInsert(_data);
    },
    'products.insertCSVDetails': function(data) {
        data.owner = Meteor.userId();
        data.username = Meteor.user().username;
        return Csvfiles.insert(data);
    },
    'products.updateCSVDetails': function(id, data) {
        return Csvfiles.update(id, { $set: data });
    }
});