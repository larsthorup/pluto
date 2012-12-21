/*global define,QUnit*/
define(function (require) {
    'use strict';
    var IQUnit = require('iqunit');
    var AppDriver = require('drivers/app');

    // ToDo: move to test/config.js
    IQUnit.config.testTimeout = 5000;
    IQUnit.config.mainJsUrl = 'app/main.js';
    IQUnit.config.injectScripts = ['/test/libs/jquery.mockjax.js', '/test/utility/jquery.waitFor.js'];
    IQUnit.config.driver = AppDriver;

    IQUnit.module('index');

    // ToDo: move to a separate suite so we can still run unit tests fast
    IQUnit.asyncTest('login-then-view-jquery', '/#login', function (require, $) {
        // then first we see the login page
        var $main = $('#main');
        var $header = $('#header');
        QUnit.equal($('h1', $header).text(), 'Pluto', 'h1');
        QUnit.equal($.trim($('label.userLabel', $main).text()), 'User Token:', '.userLabel');

        // given mocked server response
        var Trello = require('persistence/trello');
        var trello = new Trello();
        var listId = '509070d37b1e65530d005067';
        var mockUrl = trello.url + '/lists/' + listId;
        $.mockjax({
            log: null,
            url: mockUrl,
            data: {
                key: trello.appKey,
                token: 'lars',
                cards: 'open'
            },
            responseTime: 1,
            responseText: {
                cards: [{id: 42, name: 'play!'}]
            }
        });

        // when we enter a user token and click the login button
        $('input.user', $main).val('lars');
        $('a.login', $main).trigger('click');

        // then we see the list of cards
        $('ul.items li', $main).waitFor(100).done(function ($cards) {
            QUnit.equal($cards.length, 1, 'li.length');
            QUnit.equal($cards.first().text(), 'play!', 'li.text');

            QUnit.start();
        });
    });

    IQUnit.asyncTest('login-then-view', '/#login', function (require, $, app) {
        // then the app has started
        QUnit.equal(app.header.text(), 'Pluto', 'header');
        QUnit.start();
    });

//    IQUnit.asyncTest('login-then-view', '/#login', function (require, $, app) {
//        // then the app has started
//        QUnit.equal(app.header.text(), 'Pluto', 'header');
//
//        // given mocked server response
//        app.server.user('lars').list('509070d37b1e65530d005067').cards('open', [{id: 42, name: 'play!'}]);
//
//        app.loginPage().then(function (loginPage) {
//            // then we see the login page
//            QUnit.equal(loginPage.user.label(), 'User Token:', '.userLabel');
//
//            // when we enter a user token and click the login button
//            loginPage.user.input('lars');
//            loginPage.login.click();
//            return app.cardsPage();
//        }).then(function (cardsPage) {
//
//            // then we see the list of cards
//            var cards = cardsPage.cards;
//            QUnit.equal(cards.length, 1, 'cards.length');
//            QUnit.equal(cards[0].text, 'play!', 'cards[0].text');
//
//            QUnit.start();
//        });
//    });
});