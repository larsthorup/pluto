/*global define,QUnit*/
define(function (require) {
    'use strict';

    // framework
    var $ = require('jquery');

    // module under test
    var IQUnit = require('iqunit');


    // given
    var config = {
        visible: true,
        testTimeout: 2000,
        url: 'iqunit.test.html',
        injectScripts: ['iqunit.test.inject.js'],
        getJQueryUnderTest: function (window, callback) {
            // console.log('jQuery under test = ' + window.$);
            callback(window.$);
        }
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
    var configInvisible = {
        visible: false,
        testTimeout: 2000,
        url: 'iqunit.test.html',
        injectScripts: ['iqunit.test.inject.js'],
        getJQueryUnderTest: function (window, callback) {
            callback(window.$);
        }
    };
    // when
    IQUnit.module('iqunit', configInvisible);

    QUnit.test('not-visible', function () {
        // then
        QUnit.ok($('#qunit-fixture').position().left < -5000, '#qunit-fixture.position.left < -5000');
        QUnit.ok($('#qunit-fixture').position().top < -5000, '#qunit-fixture.position.top < -5000');
    });



    // Test failure to load page into frame
    // Test failure to load scripts
});