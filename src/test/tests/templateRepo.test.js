/*global define,QUnit*/
define(function (require) {
    'use strict';

    // module under test
    var TemplateRepo = require('templateRepo');

    QUnit.module('templateRepo', {
        setup: function () {
            // given
            this.templateRepo = new TemplateRepo();
        }
    });

    QUnit.test('get-failsWhenMissing', function () {
        // when + then
        QUnit.throws(function () { this.templateRepo.get('missing'); }, /assertion: template with id "missing" not found/, 'exception message');
    });

    QUnit.test('html escaping', function () {
        // when
        var template = this.templateRepo.get('card');
        var html = template({title: '<div>'});

        // then
        QUnit.equal(html, '&lt;div&gt;', 'html');
    });
});