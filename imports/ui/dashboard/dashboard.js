import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import './dashboard.html';

import { CollCloseOutPromoRFQSent } from '../../api/collections.js';

Template.dashboard.helpers({
    rfqPending() {
        return CollCloseOutPromoRFQSent.find({ Status: "Pending" }).count();
    },
    rfqApproved() {
        return CollCloseOutPromoRFQSent.find({ Status: "Approved" }).count();
    },
    rfqRejected() {
        return CollCloseOutPromoRFQSent.find({ Status: "Rejected" }).count();
    },
    rfqSend() {
        return CollCloseOutPromoRFQSent.find({ Status: "Send" }).count();
    }
});