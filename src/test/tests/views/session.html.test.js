/*global define,QUnit*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var TemplateRepo = require('templateRepo');

    QUnit.module('view.session.html');

    // ToDo: only load RequireTemplateRepo and run this test when running through a web server (not from file system)
    QUnit.test('template', function () {
        // given
        var templateRepo = new TemplateRepo();

        // when
        var $html = $(templateRepo.get('session')());

        // then
        QUnit.ok($('.login', $html).length > 0, '.login');
        QUnit.ok($('input.user', $html).length > 0, 'input.user');
    });
});