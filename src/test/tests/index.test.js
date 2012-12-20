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

    // Note: Interactive QUnit
    var IQUnit = {
        // ToDo: create waitFor as a jQuery plugin
        // http://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
        waitFor: function (jQuery, selector, timeout) {
            var waitForDeferred = function (jQuery, selector, dfd, timeout) {
                var result = jQuery(selector);
                if (result.length > 0) {
                    dfd.resolve(result);
                } else {
                    var waitTime = 50;
                    if (timeout < waitTime) {
                        dfd.reject();
                    } else {
                        window.setTimeout(function () {
                            waitForDeferred(jQuery, selector, dfd, timeout - waitTime);
                        }, waitTime);
                    }
                }
            };
            var dfd = jQuery.Deferred();
            waitForDeferred(jQuery, selector, dfd, timeout);
            return dfd.promise();
        },

        asyncTest: function (testName/*, expected*/, pageUrl, callback) {
            return QUnit.asyncTest(testName/*, expected*/, function () {
                // Note: first we load the referenced page into an iframe in QUnit's HTML fixture so we can interact with it
                q$('#qunit-fixture').html('<iframe id="appUnderTest" src="' + pageUrl + '"></iframe>');
                var $appUnderTest = q$('#appUnderTest');
                $appUnderTest.load(function () {
                    // Note: we can get a reference to the local page's require object as soon as the iframe is loaded
                    var windowUnderTest = $appUnderTest[0].contentWindow;
                    var require = windowUnderTest.require;
                    // Note: we know that all dependent modules have been loaded when the outermost dependency, app/main.js, has been loaded
                    require.onResourceLoad = function (context, map/*, depArray*/) {
                        if (map.url === 'app/main.js') {
                            // Note: so then we can get a reference to the jQuery object on the local page
                            var $ = require('jquery');
                            // Note: using the jQuery object we can load mockjax into the local page
                            $.getScript('/test/libs/jquery.mockjax.js', function () {
                                callback(require, $);
                            });
                        }
                    };
                });
            });
        }
    };

    // ToDo: create an AppDriver to make this test more readable
    IQUnit.asyncTest('login-then-view', '/#login', function (require, $) {
        // then first we see the login page
        QUnit.equal($('#header h1').text(), 'Pluto', '#header');
        QUnit.equal($.trim($('#main label.userLabel').text()), 'User Token:', '.userLabel');

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
        $('#main input.user').val('lars');
        $('#main a.login').trigger('click');

        // then we see the list of cards
        var promise = IQUnit.waitFor($, '#main ul.items li', 100);
        promise.done(function ($cards) {
            QUnit.equal($cards.length, 1, 'li.length');
            QUnit.equal($cards.first().text(), 'play!', 'li.text');

            QUnit.start();
        });
    });
});