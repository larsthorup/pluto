/*global define,QUnit*/
define(function (require) {
    'use strict';
    var IQUnit = require('iqunit');
    var AppDriver = require('drivers/app');

    // ToDo: configure iframe visibility
    IQUnit.config.testTimeout = 500000;
    IQUnit.config.mainJsUrl = 'app/main.js';
    IQUnit.config.injectScripts = ['/test/libs/jquery.mockjax.js', '/uitest/helpers/jquery.waitFor.js'];
    IQUnit.config.driver = AppDriver;

    IQUnit.module('authentication');

    IQUnit.asyncTest('login-successful', '/#login', function (require, $, app) {
        // then the app has started
        QUnit.equal(app.header.text(), 'Pluto', 'header');

        // ToDo: move to setup
        // given mocked server response
        app.server.mock({
            user: 'lars',
            lists: [{
                id: '509070d37b1e65530d005067',
                openCards: [{id: 42, name: 'play!'}]
            }]
        });

        app.loginPage().pipe(function (loginPage) {
            // then we see the login page
            QUnit.equal(loginPage.user.label, 'User Token:', 'loginPage.user.label');

            // when we enter a user token and click the login button
            loginPage.user.input('lars');
            loginPage.login.click();

            // then we are redirected to the cards page
            return app.cardsPage();
        }).pipe(function (cardsPage) {

            // then we see the list of cards
            var cards = cardsPage.cards;
            QUnit.equal(cards.length, 1, 'cards.length');
            QUnit.equal(cards[0].text, 'play!', 'cards[0].text');

            QUnit.start();
        });
    });

    IQUnit.asyncTest('login-fails', '/#login', function (require, $, app) {
        // then the app has started
        QUnit.equal(app.header.text(), 'Pluto', 'header');

        // ToDo: move to setup
        // given mocked server response
        app.server.mock({
            user: 'lars',
            lists: [{
                id: '509070d37b1e65530d005067',
                status: 401 // Note: 401 = Unauthorized
            }]
        });

        app.loginPage().pipe(function (loginPage) {
            // then we see the login page
            QUnit.equal(loginPage.user.label, 'User Token:', 'loginPage.user.label');

            // when we enter a user token and click the login button
            loginPage.user.input('lars');
            loginPage.login.click();

            // then we are redirected to the login page
            return app.loginPage();
        }).pipe(function (loginPage) {

            // then the user input field is blank
            QUnit.equal(loginPage.user.val(), '', 'loginPage.user.value');

            QUnit.start();
        });
    });

});