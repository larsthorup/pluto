/*global define*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';
    var _ = require('underscore');
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
        // ToDo: consider waiting for $('#iqUnit-appUnderTest').load event to catch page navigation
        // ToDo: configurable timeout
        loginPage: function () {
            // Note: we need to pause initially to wait for the page to start reloading
            var promise = this.$('#main').waitFor({timeout: 100, pause: 100}).then(_.bind(function ($elem) {
                return new LoginDriver($elem, this.$);
            }, this));
            return promise;
        },
        cardsPage: function () {
            var promise = this.$('#main ul.items li').waitFor({timeout: 100, pause: 100}).then(_.bind(function ($elem) {
                return new CardsDriver($elem, this.$);
            }, this));
            return promise;
        },
        html: function () {
            return this.$('html')[0].outerHTML;
        }
    };
    return AppDriver;
});