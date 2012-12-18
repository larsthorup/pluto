/*global define,QUnit*/
define(function (require) {
    'use strict';

    // framework
    var $ = require('jquery');

    // module under test
    var templateRepo = require('templateRepo');

    QUnit.module('view.session.html');

    QUnit.test('template', function () {
        // when
        var $html = $(templateRepo.session());

        // then
        QUnit.ok($('.login', $html).length > 0, '.login');
        QUnit.ok($('input.user', $html).length > 0, 'input.user');
    });
});