/*global define,QUnit*/
define(function (require) {
    'use strict';
    var IQUnit = require('iqunit');
    var AppDriver = require('drivers/app');
    var config = require('helpers/iqunit.config.js');

    config.url = '/#login';

    IQUnit.module('authentication', config, {
        setup: function () {
            this.app = new AppDriver(this.$);

            // given mocked server response
            this.app.server.mock({
                user: 'lars',
                lists: [{
                    id: '509070d37b1e65530d005067',
                    openCards: [{id: 42, name: 'play!'}]
                }]
            });
        },
        teardown: function () {
            this.app.server.mockClear();
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

            // Note: demonstrates how to dump html of the page for debugging purposes
            // console.log(self.app.html());

            // then we see the list of cards
            var cards = cardsPage.cards;
            QUnit.equal(cards.length, 1, 'cards.length');
            QUnit.equal(cards[0].text, 'play!', 'cards[0].text');

        }).done(function () {
            QUnit.start();
        }).fail(function (msg) {
            QUnit.ok(false, msg);
            QUnit.start();
        });
    });

    IQUnit.module('authentication', config, {
        setup: function () {
            this.app = new AppDriver(this.$);

            // given mocked server response
            this.app.server.mock({
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

        }).done(function () {
            QUnit.start();
        }).fail(function (msg) {
            QUnit.ok(false, msg);
            QUnit.start();
        });
    });

});