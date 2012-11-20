/*global define,QUnit*/
define(function (/*require*/) {
    'use strict';

    QUnit.module('util');
    QUnit.test('simple', function () {
        QUnit.equal(2 + 2, 4, 'kindergarten');
    });
});
