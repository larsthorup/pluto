/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    var apiVersion = 1;
    // ToDo: should this be a factory?
    var trello = {

        appKey: '4c5b4d16e6e53d893674f9452ac277bf',

        url: 'https://api.trello.com/' + apiVersion,

        login: function (token) {
            trello.token = token;
        },

        logout: function () {
            trello.token = null;
        },

        sync: function (method, model, options) {
            if (!trello.token) {
                throw new Error('Assertion failed: trello.login() has not been called');
            }
            options.data.key = trello.appKey;
            options.data.token = trello.token;
            return Backbone.sync(method, model, options);
        }
    };

    return trello;
});