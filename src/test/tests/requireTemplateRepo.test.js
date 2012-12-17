// ToDo: only load RequireTemplateRepo and run this test when running through a web server (not from file system)
//define(function (require) {
//    'use strict';
//    var TemplateRepo = require('requireTemplateRepo');
//
//    QUnit.module('requireTemplateRepo', {
//        setup: function () {
//            // given
//            this.templateRepo = new TemplateRepo();
//        }
//    });
//
//    QUnit.test('get-failsWhenMissing', function () {
//        // when + then
//        QUnit.throws(function () { this.templateRepo.get('missing'); }, /assertion: template with id "missing" not found/, 'exception message');
//    });
//});