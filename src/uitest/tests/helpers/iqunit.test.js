/*global define,QUnit*/
define(function (require) {
    'use strict';

    // framework
//    var $ = require('jquery');
//    require('mockjax');

    // module under test
    var IQUnit = require('iqunit');

    var config = {
        visible: true,
        testTimeout: 2000,
        url: 'iqunit.test.html',
        injectScripts: [], // ['/lib/inject.js'],
        getJQueryUnderTest: function (window, callback) {
            // console.log('jQuery under test = ' + window.$);
            callback(window.$);
        }
    };
//    $.mockjax({
//        // log: null,
//        url: '/lib/inject.js',
//        responseText: 'window.injected = true',
//        responseTime: 1
//    });

    IQUnit.module('iqunit', config, {
        setup: function () {

        },
        teardown: function () {
        }
    });

    QUnit.asyncTest('test', function () {
        // ToDo: implement
        QUnit.expect(0);
        QUnit.start();
    });

    // ToDo: invoke mockjaxClear after all tests (QUnit.end())
    // $.mockjaxClear(mockjaxId);


    // Test that page is loaded into frame
    // Test config.visible
    // Test failure to load page into frame
    // Test that self.$ refers to inner page
    // Test script loading
    // Test failure to load scripts
});