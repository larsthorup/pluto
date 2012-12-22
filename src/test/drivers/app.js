/*global define*/
define(function (require) {
    'use strict';
    var HeaderDriver = require('drivers/header');
    var ServerDriver = require('drivers/server');
    var LoginDriver = require('drivers/login');
    var CardsDriver = require('drivers/cards');

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
        },
        cardsPage: function () {
            var promise = this.$('#main ul.items li').waitFor().pipe(this.$.proxy(function ($elem) {
                return new CardsDriver($elem, this.$);
            }, this));
            return promise;
        }
    };
    return AppDriver;
});