/*global define*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    // Note: we use a backbone model as a stub to make it easily work with a collection
    var SessionStub = Backbone.Model.extend();
    return SessionStub;
});