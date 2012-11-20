/*global define,QUnit*/
define(function (require) {
    'use strict';

    var app = require('app');
    QUnit.module('app', {
        setup: function () {
            // given
            // this.app = new App();
        }
    });

    QUnit.test('construction', function () {
        // then
        QUnit.equal(app.view.model.get('title'), 'Meet Rob', 'app.view.model.title');
    });
});
