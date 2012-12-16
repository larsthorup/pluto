/*global define,QUnit*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var TemplateRepo = require('templateRepo');

    QUnit.module('templateRepo', {
        setup: function () {
            // given
            this.document = $('<div><script type="template/text" id="lemonSpan"><span><%=text%></span></script></div>');
            this.templateRepo = new TemplateRepo(this.document);
        }
    });

    QUnit.test('get', function () {
        // when
        var template = this.templateRepo.get('lemonSpan');
        var templateInstantiation = template({text: 'Lemon'});

        // then
        QUnit.equal(templateInstantiation, '<span>Lemon</span>', 'templateInstantiation');
    });
});