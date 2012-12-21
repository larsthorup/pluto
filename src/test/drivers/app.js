/*global define*/
define(function (require) {
    'use strict';
    var HeaderDriver = require('drivers/header');
    var LoginDriver = require('drivers/login');
    var ServerDriver = require('drivers/server');

    var AppDriver = function ($) {
        this.$ = $;
        this.header = new HeaderDriver('#header', this.$);
        this.server = new ServerDriver(this.$);
    };
    AppDriver.prototype = {
        loginPage: function () {
            var promise = this.$('#main').waitFor().pipe(this.$.proxy(function ($elem) {
                return new LoginDriver($elem, this.$);
            }, this));
            return promise;
        }
    };
    return AppDriver;
});