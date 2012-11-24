/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';

    var Router = require('router');
    var getApp = require('app');
    var CardsViewFactory = require('views/cards');
    var SessionViewFactory = require('views/session');

    QUnit.module('app', {
        setup: function () {
            // Note: mock views so we won't have to include their templates here
            CardsViewFactory.mockWith(sinon.spy);
            SessionViewFactory.mockWith(sinon.spy);
            // given
            this.app = getApp();
            this.router = new Router();
        },
        teardown: function () {
            this.app.destroy();
            SessionViewFactory.restore();
            CardsViewFactory.restore();
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
        this.app.bootstrap(this.document, this.router);

        // when
        this.app.router.trigger('route:index');

        // then
        QUnit.ok(CardsViewFactory.mock.render.calledOnce, 'CardsView.render.calledOnce');
    });

    QUnit.test('route:login-goLogin', function () {
        // given
        this.app.bootstrap(this.document, this.router);

        // when
        this.app.router.trigger('route:login');

        // then
        QUnit.ok(SessionViewFactory.mock.render.calledOnce, 'SessionView.render.calledOnce');
    });
});
