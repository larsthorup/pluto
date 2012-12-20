/*global define,QUnit,window*/
define(function (require) {
    'use strict';
    var q$ = require('jquery');

    QUnit.module('index', {
        setup: function () {
            this.testTimeoutBefore = QUnit.config.testTimeout;
            QUnit.config.testTimeout = 5000;
        },
        teardown: function () {
            QUnit.config.testTimeout = this.testTimeoutBefore;
        }
    });

    // ToDo: hide the plumbing
    QUnit.asyncTest('login-then-view', function () {
        // when we ask for the login page
        q$('#qunit-fixture').html('<iframe id="appUnderTest" src="/#login"></iframe>');
        var $appUnderTest = q$('#appUnderTest');
        $appUnderTest.load(function () {
            var windowUnderTest = $appUnderTest[0].contentWindow;
            var require = windowUnderTest.require;
            require.onResourceLoad = function (context, map/*, depArray*/) {
                if (map.url === 'app/main.js') { // Note: now all application modules have been loaded
                    var $ = require('jquery');
                    $.getScript('/test/libs/jquery.mockjax.js', function () {
                        var Trello = require('persistence/trello');
                        var trello = new Trello();

                        // ToDo: return a promise instead
                        var waitFor = function (selector, callback) {
                            var result = $(selector);
                            if (result.length > 0) {
                                callback(result);
                            } else {
                                window.setTimeout(function () {
                                    waitFor(selector, callback);
                                }, 50);
                            }
                        };

                        // then we see the login page
                        QUnit.equal($('#header h1').text(), 'Pluto', '#header');
                        QUnit.equal($.trim($('#main label.userLabel').text()), 'User Token:', '.userLabel');

                        // given mocked server response
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
                        $('#main input.user').val('lars');
                        $('#main a.login').trigger('click');

                        // then we see the list of cards
                        waitFor('#main ul.items li', function ($cards) {
                            QUnit.equal($cards.length, 1, 'li.length');
                            QUnit.equal($cards.first().text(), 'play!', 'li.text');

                            QUnit.start();
                        });
                    });
                }
            };
        });
    });
});