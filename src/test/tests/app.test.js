/*global define,QUnit,sinon,window*/
define(function (require) {
    'use strict';

    var $ = require('jquery');
    require('mockjax');
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

    QUnit.asyncTest('route:index-goCardsView', function () {
        // given
        this.app.bootstrap(this.document, this.router);
        this.app.session.login('lars');
        $.mockjax({
            log: null,
            url: 'https://api.trello.com/1/lists/509070d37b1e65530d005067',
            data: {
                key: '4c5b4d16e6e53d893674f9452ac277bf',
                token: 'lars',
                cards: 'open'
            },
            responseTime: 1,
            responseText: {
                cards: [{id: 42, name: 'play!'}]
            }
        });

        // when
        this.app.router.trigger('route:index');

        // ToDo: use callback instead of timeout
        window.setTimeout($.proxy(function () {
            // then
            QUnit.ok(CardsViewFactory.mock.render.calledOnce, 'CardsView.render.calledOnce');
            // ToDo: mock model
            QUnit.equal(this.app.cards.length, 1);
            QUnit.equal(this.app.cards.get(42).get('title'), 'play!');
            QUnit.start();
        }, this), 10);
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
