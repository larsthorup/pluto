/*global define,QUnit*/
define(function (require) {
    'use strict';

    var $ = require('jquery');
    var BaseView = require('views/base');

    QUnit.module('views.base', {
        setup: function () {
            // given
            this.baseView = new BaseView();
            this.baseView.document = $('<div><script type="text/template" id="tpl"><div>hep</div></script></div>');
        }
    });

    QUnit.test('makeTemplate', function () {
        // when
        var template = this.baseView.makeTemplate('tpl');

        // then
        QUnit.equal(template(), '<div>hep</div>', 'template()');
    });

    QUnit.test('makeTemplate-failsWhenTemplateIsMissing', function () {
        // when + then
        QUnit.throws(function () { this.baseView.makeTemplate('does-not-exist'); }, /does-not-exist/, 'throws does-not-exist');
    });
});