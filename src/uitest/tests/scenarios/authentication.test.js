/*global define,QUnit*/
define(function (require) {
    'use strict';
    var IQUnit = require('iqunit');
    var AppDriver = require('drivers/app');

    // ToDo: move configuration elsewhere
    IQUnit.config.testTimeout = 500000;
    IQUnit.config.injectScripts = ['/test/libs/jquery.mockjax.js', '/uitest/helpers/jquery.waitFor.js'];
    IQUnit.config.visible = true;
    IQUnit.config.getJQueryUnderTest = function (window, callback) {
        // Note: we can get a reference to the local page's require object as soon as the iframe is loaded
        var require = window.require;
        var mainJsUrl = 'app/main.js';

        // Note: we know that all dependent modules have been loaded when the outermost dependency, app/main.js, has been loaded
        // ToDo: error handling
        require.onResourceLoad = function (context, map/*, depArray*/) {
            if (map.url === mainJsUrl) {

                // Note: so then we can get a reference to the jQuery object in the app under test
                var a$ = require('jquery');
                callback(a$);
            }
        };
    };

    IQUnit.module('authentication', '/#login', {
        setup: function () {
            var self = this;
            self.app = new AppDriver(self.$);

            // given mocked server response
            self.app.server.mock({
                user: 'lars',
                lists: [{
                    id: '509070d37b1e65530d005067',
                    openCards: [{id: 42, name: 'play!'}]
                }]
            });
        }
    });

    QUnit.asyncTest('login-successful', function () {
        var self = this;

        // then the app has started
        QUnit.equal(self.app.header.text(), 'Pluto', 'header');

        self.app.loginPage().then(function (loginPage) {
            // then we see the login page
            QUnit.equal(loginPage.user.label, 'User Token:', 'loginPage.user.label');

            // when we enter a user token and click the login button
            loginPage.user.input('lars');
            loginPage.login.click();

            // then we are redirected to the cards page
            return self.app.cardsPage();
        }).then(function (cardsPage) {

            // ToDo: demonstrate how to dump html of the page for debugging purposes

            // then we see the list of cards
            var cards = cardsPage.cards;
            QUnit.equal(cards.length, 1, 'cards.length');
            QUnit.equal(cards[0].text, 'play!', 'cards[0].text');

            QUnit.start();
        });
    });

    IQUnit.module('authentication', '/#login', {
        setup: function () {
            var self = this;
            self.app = new AppDriver(self.$);

            // given mocked server response
            self.app.server.mock({
                user: 'lars',
                lists: [{
                    id: '509070d37b1e65530d005067',
                    status: 401 // Note: 401 = Unauthorized
                }]
            });
        }
    });

    QUnit.asyncTest('login-fails', function () {
        var self = this;

        // then the app has started
        QUnit.equal(self.app.header.text(), 'Pluto', 'header');

        self.app.loginPage().then(function (loginPage) {
            // then we see the login page
            QUnit.equal(loginPage.user.label, 'User Token:', 'loginPage.user.label');

            // when we enter a user token and click the login button
            loginPage.user.input('lars');
            loginPage.login.click();

            // then we are redirected to the login page
            return self.app.loginPage();
        }).then(function (loginPage) {

            // then the user input field is blank
            QUnit.equal(loginPage.user.val(), '', 'loginPage.user.value');

            QUnit.start();
        });
    });

});