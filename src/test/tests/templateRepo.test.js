/*global define,QUnit*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';

    // module under test
    var templateRepo = require('templateRepo');

    QUnit.module('templateRepo');

    QUnit.test('get-failsWhenMissing', function () {
        // when + then
        QUnit.equal(templateRepo.missing, undefined, 'missing');
    });

    QUnit.test('html escaping', function () {
        // when
        var template = templateRepo.card;
        var html = template({title: '<div>'});

        // then
        QUnit.equal(html, '&lt;div&gt;', 'html');
    });
});