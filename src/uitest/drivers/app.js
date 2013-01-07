/*global define*/
define(function (require) {
    'use strict';
    var HeaderDriver = require('drivers/header');
    var ServerDriver = require('drivers/server');
    var LoginDriver = require('drivers/login');
    var CardsDriver = require('drivers/cards');

    var AppDriver = function ($) {
        var self = this;
        self.$ = $;
        self.header = new HeaderDriver('#header', self.$);
        self.server = new ServerDriver(self.$);
    };
    AppDriver.prototype = {
        // ToDo: consider waiting for $('#iqUnit-appUnderTest').load event to catch page navigation
        // ToDo: configurable timeout
        loginPage: function () {
            var self = this;
            // Note: we need to pause initially to wait for the page to start reloading
            var promise = self.$('#main').waitFor({timeout: 100, pause: 100}).then(function ($elem) {
                return new LoginDriver($elem, self.$);
            });
            return promise;
        },
        cardsPage: function () {
            var self = this;
            var promise = self.$('#main ul.items li').waitFor({timeout: 100, pause: 100}).then(function ($elem) {
                return new CardsDriver($elem, self.$);
            });
            return promise;
        },
        html: function () {
            var self = this;
            return self.$('html')[0].outerHTML;
        }
    };
    return AppDriver;
});