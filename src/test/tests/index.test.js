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
            // ToDo: how to invoke require('jquery')?
            // var $ = window.frames[0].jQuery;
            var doc = window.frames[0].document;
            QUnit.equal(doc.getElementById('header').getElementsByTagName('h1')[0].textContent, 'Pluto', '#header');
            QUnit.ok(true, 'loaded');
            QUnit.start();
        });
    });
});