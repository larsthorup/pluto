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

                        var waitFor = function (selector, timeout) {
                            var waitForDeferred = function (selector, dfd, timeout) {
                                var result = $(selector);
                                if (result.length > 0) {
                                    dfd.resolve(result);
                                } else {
                                    var waitTime = 50;
                                    if (timeout < waitTime) {
                                        dfd.reject();
                                    } else {
                                        window.setTimeout(function () {
                                            waitForDeferred(selector, dfd, timeout - waitTime);
                                        }, waitTime);
                                    }
                                }
                            };
                            var dfd = $.Deferred();
                            waitForDeferred(selector, dfd, timeout);
                            return dfd.promise();
                        };

                        // given
                        var Trello = require('persistence/trello');
                        var trello = new Trello();

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
                        var promise = waitFor('#main ul.items li', 100);
                        promise.done(function ($cards) {
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