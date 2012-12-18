/*global define,QUnit*/
define(function (require) {
    'use strict';

    // framework
    require('mockjax');

    // module under test
    var getApp = require('app');

    // stubs
    var RouterStub = require('stubs/router');
    var CardCollectionStub = require('stubs/collections/cards');
    var TrelloStub = require('stubs/persistence/trello');
    var SessionStub = require('stubs/models/session');
    var CardsViewStub = require('stubs/views/cards');
    var SessionViewStub = require('stubs/views/session');

    QUnit.module('app', {
        setup: function () {
            // given
            this.app = getApp({
                Trello: TrelloStub,
                Session: SessionStub,
                CardsView: CardsViewStub,
                SessionView: SessionViewStub,
                CardCollection: CardCollectionStub
            });
            this.router = new RouterStub();
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
        this.app.bootstrap(this.document, this.router);

        // when
        this.app.router.trigger('route:index');

        // then
        QUnit.ok(this.app.view instanceof CardsViewStub, 'app.view instanceof CardsView');
        QUnit.ok(this.app.view.render.calledOnce, 'app.view.render.calledOnce');
        QUnit.ok(this.app.cards.fetch.calledOnce, 'app.cards.fetch.calledOnce');
    });

    QUnit.test('route:login-goLogin', function () {
        // given
        this.app.bootstrap(this.document, this.router);

        // when
        this.app.router.trigger('route:login');

        // then
        QUnit.ok(this.app.view instanceof SessionViewStub, 'app.view instanceof SessionView');
        QUnit.ok(this.app.view.render.calledOnce, 'app.view.render.calledOnce');
    });

    QUnit.test('goCardsView-redirectsToLoginIfFetchFails', function () {
        // given
        this.app.bootstrap(this.document, this.router);
        CardCollectionStub.fetchFailCount = 1;

        // when
        this.app.goCardsView();

        // then
        QUnit.ok(this.app.router.navigate.calledWith('login'));
    });
});
