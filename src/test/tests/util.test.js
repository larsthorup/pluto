/*global define,QUnit*/
/*jslint vars:true nomen:true*/
define(function () {
    'use strict';

    QUnit.module('util');
    QUnit.test('simple', function () {
        QUnit.equal(2 + 2, 4, 'kindergarten');
    });
});
