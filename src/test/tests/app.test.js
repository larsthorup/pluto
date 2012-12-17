/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';

    var $ = require('jquery');
    require('mockjax');
    var Router = require('router');
    var getApp = require('app');
    var Trello = require('persistence/trello');
    var Session = require('models/session');
    var CardsViewFactory = require('views/cards');
    var SessionViewFactory = require('views/session');
    var CardCollectionFactory = require('collections/cards');

    QUnit.module('app', {
        setup: function () {
            // ToDo: use hand crafted stubs
            CardsViewFactory.mockWith(sinon.spy);
            SessionViewFactory.mockWith(sinon.spy);
            CardCollectionFactory.mockWith(sinon.spy, {fetch: function () { return $.Deferred(); }});

            // given
            this.app = getApp({
                Trello: Trello,
                Session: Session,
                CardsViewFactory: CardsViewFactory,
                SessionViewFactory: SessionViewFactory,
                CardCollectionFactory: CardCollectionFactory
            });
            this.router = new Router();
        },
        teardown: function () {
            this.app.destroy();
            CardCollectionFactory.restore();
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
        QUnit.ok(this.app.view.render.calledOnce, 'app.view.render.calledOnce');
        QUnit.ok(this.app.cards.fetch.calledOnce, 'app.cards.fetch.calledOnce');
    });

    QUnit.test('route:login-goLogin', function () {
        // given
        this.app.bootstrap(this.document, this.router);

        // when
        this.app.router.trigger('route:login');

        // then
        QUnit.ok(SessionViewFactory.mock.render.calledOnce, 'SessionView.render.calledOnce');
    });

    QUnit.test('goCardsView-redirectsToLoginIfFetchFails', function () {
        // given
        this.app.bootstrap(this.document, this.router);
        this.app.router.navigate = sinon.spy();
        CardCollectionFactory.mock.fetch = function () {
            var deferred = $.Deferred();
            deferred.reject(); // Note: simulate that fetch fails
            return deferred;
        };

        // when
        this.app.goCardsView();

        // then
        QUnit.ok(this.app.router.navigate.calledWith('login'));
    });
});
