import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import './schema.html';

Template.addSchema.onRendered(function(templating) {
    let $self = this;

    let editor = CodeMirror.fromTextArea($self.find('#customSchema'), {
        lineNumbers: true,
        mode: "json" // set any of supported language modes here
    });
});