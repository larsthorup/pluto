/*global define,QUnit*/
define(function (require) {
    'use strict';

    var $ = require('jquery');
    var Router = require('router');
    var getApp = require('app');

    QUnit.module('app', {
        setup: function () {
            // given
            this.app = getApp();
        },
        teardown: function () {
            this.app.destroy();
        }
    });

    QUnit.test('singleton', function () {
        // when
        var app = getApp();

        // then
        QUnit.equal(app, this.app, 'new App() returns a singleton');
    });

    QUnit.test('route:index-goCardsView', function () {
        // given
        // ToDo: mock CardsView so we won't have to include its template here
        var document = $('<div>' +
            '<script type="template/text" id="card-template"><ul></ul></script>' +
            '<script type="template/text" id="cards-template"><ul></ul></script>' +
            '<script type="template/text" id="cards-item-template"><li></li></script>' +
            '</div>');
        var router = new Router();
        this.app.bootstrap(document, router);

        // when
        this.app.router.trigger('route:index');

        // then
        QUnit.equal(this.app.view.collection.get(11).get('title'), 'Meet Rob', 'app.view.collection.get(11).title');
        QUnit.equal(this.app.view.collection.get(12).get('title'), 'Buy lunch', 'app.view.collection.get(12).title');
        QUnit.equal(this.app.view.collection.length, 2);
    });

    QUnit.test('route:login-goLogin', function () {
        // given
        // ToDo: mock CardsView so we won't have to include its template here
        var document = $('<div>' +
            '<script type="template/text" id="session-template"><input/></script>' +
            '</div>');
        var router = new Router();
        this.app.bootstrap(document, router);

        // when
        this.app.router.trigger('route:login');

        // then
        QUnit.equal(this.app.view.model.get('userId'), null, 'app.view.model.userId');
    });
});
