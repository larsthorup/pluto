/*global define,QUnit*/
define(function (require) {
    'use strict';

    var getApp = require('app');
    QUnit.module('app', {
        setup: function () {
            // given
            this.app = getApp();
        },
        teardown: function () {
            this.app.reset();
        }
    });

    QUnit.test('singleton', function () {
        // when
        var app = getApp();

        // then
        QUnit.equal(app, this.app, 'new App() returns a singleton');
    });

    QUnit.test('bootstrap', function () {
        // when
        this.app.bootstrap();

        // then
        QUnit.equal(this.app.view.model.get('title'), 'Meet Rob', 'app.view.model.title');
    });
});
