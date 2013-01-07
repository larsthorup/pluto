/*global define,QUnit*/
define(function () {
    'use strict';

    // framework
//    require('mockjax');
//
    // module under test
//    var IQUnit = require('iqunit');
//
//    var config = {
//        visible: true,
//        testTimeout: 2000,
//        injectScripts: ['/lib/inject.js'],
//        getJQueryUnderTest: function (window, callback) {
//            callback(window);
//        },
//        url: '/page.html'
//    };

//    IQUnit.module('iqunit', config, {
//        setup: function () {
//
//        },
//        teardown: function () {
//              $.mockjaxClear(mockjaxId)
//        }
//    });

    QUnit.asyncTest('test', function () {
        // ToDo: implement
        QUnit.expect(0);
        QUnit.start();
    });

    // Test that page is loaded into frame
    // Test config.visible
    // Test failure to load page into frame
    // Test that self.$ refers to inner page
    // Test script loading
    // Test failure to load scripts
});