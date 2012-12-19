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
            windowUnderTest.require.onResourceLoad = function (context, map/*, depArray*/) {
                if (map.url === 'app/main.js') { // Note: now all application modules have been loaded
                    var $ = windowUnderTest.require('jquery');
                    $.getScript('/test/libs/jquery.mockjax.js', function () {

                        // then we see the login page
                        QUnit.equal($('#header h1').text(), 'Pluto', '#header');
                        QUnit.equal($.trim($('#main label.userLabel').text()), 'User Token:', '.userLabel');

                        // given mocked server response
                        $.mockjax({
                            log: null,
                            url: 'https://api.trello.com/1/lists/509070d37b1e65530d005067',
                            data: {
                                key: '4c5b4d16e6e53d893674f9452ac277bf', // ToDo: this.trello.appKey,
                                token: 'lars',
                                cards: 'open'
                            },
                            responseTime: 1,
                            responseText: {
                                cards: [{id: 42, name: 'play!'}]
                            }
                        });


                        // when we enter a user token and click the login button
                        var secretUserToken = 'lars';
                        $('#main input.user').val(secretUserToken);
                        $('#main a.login').trigger('click');

                        // ToDo figure out how to wait for page to change
                        window.setTimeout(function () {

                            // then we see the list of cards
                            var $cards = $('#main ul.items li');
                            QUnit.equal($cards.length, 1, 'li.length');
                            QUnit.equal($cards.first().text(), 'play!', 'li.text');

                            QUnit.start();
                        }, 2000);

                    });
                }
            };
        });
    });
});