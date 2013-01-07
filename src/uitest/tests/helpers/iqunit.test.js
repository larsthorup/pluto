/*global define,QUnit*/
define(function (require) {
    'use strict';

    // framework
    var $ = require('jquery');

    // module under test
    var IQUnit = require('iqunit');

    var getGlobalJQuery = function (window, callback) {
        // console.log('jQuery under test = ' + window.$);
        callback(window.$);
    };

    // given
    var config = {
        visible: true,
        url: 'iqunit.test.html',
        getJQueryUnderTest: getGlobalJQuery,
        injectScripts: ['iqunit.test.inject.js']
    };

    // when
    IQUnit.module('iqunit', config);

    QUnit.test('url', function () {
        var self = this;

        // then
        QUnit.equal(self.$.trim(self.$('body').text()), 'IQUnit Test', 'body.text');
    });

    QUnit.test('injectScripts', function () {
        var self = this;

        // then
        QUnit.equal(self.$.fn.injected(), 'injected!', '$.fn.injected()');
    });

    QUnit.test('visible', function () {
        // then
        QUnit.ok($('#qunit-fixture').position().left > 0, '#qunit-fixture.position.left > 0');
        QUnit.ok($('#qunit-fixture').position().top > 0, '#qunit-fixture.position.top > 0');
    });


    // given
    var configVisibleIsFalse = {
        visible: false,
        url: 'iqunit.test.html',
        getJQueryUnderTest: getGlobalJQuery,
        injectScripts: ['iqunit.test.inject.js']
    };
    // when
    IQUnit.module('iqunit', configVisibleIsFalse);

    QUnit.test('not-visible', function () {
        // then
        QUnit.ok($('#qunit-fixture').position().left < -5000, '#qunit-fixture.position.left < -5000');
        QUnit.ok($('#qunit-fixture').position().top < -5000, '#qunit-fixture.position.top < -5000');
    });


    // given
    var configUrlIsBad = {
        visible: true,
        url: 'notFound.test.html',
        error: function (msg) {
            // then
            QUnit.equal(msg, 'Failed to load "notFound.test.html"', 'msg');
            QUnit.start();
        }
    };
    // when
    IQUnit.module('iqunit', configUrlIsBad);
    QUnit.test('bad-url', function () {
    });


    // given
    var configInjectedScriptIsBad = {
        visible: true,
        url: 'iqunit.test.html',
        getJQueryUnderTest: getGlobalJQuery,
        injectScripts: ['notFound.test.inject.js'],
        error: function (msg) {
            // then
            QUnit.equal(msg, 'Failed to load "notFound.test.inject.js"', 'msg');
            QUnit.start();
        }
    };
    // when
    IQUnit.module('iqunit', configInjectedScriptIsBad);
    QUnit.test('missing injected script', function () {
    });

});