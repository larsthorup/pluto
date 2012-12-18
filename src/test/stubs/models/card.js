/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    // Note: we use a backbone model as a stub to make it easily work with a collection
    var CardStub = Backbone.Model.extend();
    return CardStub;
});