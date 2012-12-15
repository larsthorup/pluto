/*global define*/
define(function (require) {
    'use strict';

    var Backbone = require('backbone');

    var Session = Backbone.Model.extend({
        // ToDo: standardize model constructor with Backbone conventions
        constructor: function (trello) {
            Backbone.Model.apply(this);
            this.trello = trello;
        },

        defaults: {
            userId: null
        },

        login: function (userId) {
            // ToDo: error handling
            this.trello.login(userId);
            this.set('userId', userId);
        }
    });

    return Session;
});