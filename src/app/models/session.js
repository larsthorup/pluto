/*global define*/
define(function (require) {
    'use strict';

    var Backbone = require('backbone');

    var Session = Backbone.Model.extend({
        defaults: {
            userId: null
        }
    });

    return Session;
});