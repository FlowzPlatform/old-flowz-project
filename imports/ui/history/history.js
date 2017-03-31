  import { Meteor } from 'meteor/meteor';
  import { Template } from 'meteor/templating';

 import './history.html';

import { Csvfiles } from '../../api/collections.js';

Template.history.helpers({
    files() {
        return Csvfiles.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } });
    },
});
