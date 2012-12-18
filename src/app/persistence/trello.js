/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    var apiVersion = 1;
    var Trello = function () {
        this.appKey = '4c5b4d16e6e53d893674f9452ac277bf';
        this.url = 'https://api.trello.com/' + apiVersion;
    };
    Trello.prototype = {
        login: function (token) {
            this.token = token;
        },

        logout: function () {
            this.token = null;
        },

        sync: function (method, model, options) {
            if (!this.token) {
                throw new Error('Assertion failed: trello.login() has not been called');
            }
            options.data.key = this.appKey;
            options.data.token = this.token;
            return Backbone.sync(method, model, options);
        }
    };

    return Trello;
});