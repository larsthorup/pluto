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

    QUnit.asyncTest('login-then-view', function () {
        q$('#qunit-fixture').html('<iframe id="appUnderTest" src="/#login"></iframe>');
        q$('#appUnderTest').load(function () {
            // ToDo: how to wait until jquery (and everything else) have been loaded?
            window.setTimeout(function () {
                var $ = window.document.getElementById('appUnderTest').contentWindow.require('jquery');
                QUnit.equal($('#header h1').text(), 'Pluto', '#header');
                QUnit.start();
            }, 1000);
        });
    });
});