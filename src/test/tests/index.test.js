/*global define,QUnit*/
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

    QUnit.asyncTest('login-then-view', function () {
        q$('#qunit-fixture').html('<iframe id="appUnderTest" src="/#login"></iframe>');
        var $appUnderTest = q$('#appUnderTest');
        $appUnderTest.load(function () {
            var windowUnderTest = $appUnderTest[0].contentWindow;
            windowUnderTest.require.onResourceLoad = function (context, map/*, depArray*/) {
                if (map.url === 'app/main.js') { // Note: now all application modules have been loaded
                    var $ = windowUnderTest.require('jquery');
                    QUnit.equal($('#header h1').text(), 'Pluto', '#header');
                    QUnit.start();
                }
            };
        });
    });
});