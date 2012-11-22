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
        QUnit.equal(this.app.view.collection.get(11).get('title'), 'Meet Rob', 'app.view.collection.get(11).title');
        QUnit.equal(this.app.view.collection.get(12).get('title'), 'Buy lunch', 'app.view.collection.get(12).title');
        QUnit.equal(this.app.view.collection.length, 2);
    });
});
