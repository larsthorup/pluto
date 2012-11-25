/*global define*/
define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    var trello = require('persistence/trello');

    var Session = Backbone.Model.extend({
        defaults: {
            userId: null
        },

        login: function (userId) {
            // ToDo: error handling
            trello.login(userId);
            this.set('userId', userId);
        }
    });

    return Session;
});