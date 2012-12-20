/*global define,QUnit*/
define(function (require) {
    'use strict';
    var IQUnit = require('iqunit');

    QUnit.module('index', {
        setup: function () {
            this.testTimeoutBefore = QUnit.config.testTimeout;
            QUnit.config.testTimeout = 5000;
        },
        teardown: function () {
            QUnit.config.testTimeout = this.testTimeoutBefore;
        }
    });


    // ToDo: move to a separate suite so we can still run unit tests fast
    // ToDo: create an AppDriver to make this test more readable
    IQUnit.asyncTest('login-then-view', '/#login', function (require, $) {
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
});