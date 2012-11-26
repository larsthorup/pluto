/*global define, QUnit*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    require('mockjax');
    var trello = require('persistence/trello');
    var Card = require('models/card');
    var CardCollectionFactory = require('collections/cards');

    QUnit.module('collection.cards', {
        setup: function () {
            // given
            this.cards = CardCollectionFactory.create(null, {listId: 'abc'});
        }
    });

    QUnit.test('initialize', function () {
        // then
        QUnit.equal(this.cards.id, 'abc', 'cards.id');
    });

    QUnit.test('model', function () {
        // when
        this.cards.create({id: 42, title: 'Grow tomatoes'});

        // then
        QUnit.equal(this.cards.length, 1, 'cards.length');
        var card = this.cards.get(42);
        QUnit.ok(card instanceof Card, 'card instanceof Cards');
        QUnit.equal(card.get('title'), 'Grow tomatoes', 'card.title');
    });

    QUnit.test('parse', function () {
        // given
        var response = {
            cards: [{id: 43, name: 'sing?'}]
        };

        // when
        var itemArray = this.cards.parse(response);

        // then
        QUnit.deepEqual(itemArray, [{id: 43, name: 'sing?'}], 'parse()');
    });

    QUnit.asyncTest('fetch', function () {
        // given
        trello.login('lars');
        $.mockjax({
            log: null,
            url: 'https://api.trello.com/1/lists/abc',
            data: {
                key: trello.appKey,
                token: 'lars',
                cards: 'open'
            },
            responseTime: 1,
            responseText: {
                cards: [{id: 42, name: 'play!'}]
            }
        });

        // when
        var fetchPromise = this.cards.fetch();

        // then
        fetchPromise.done($.proxy(function () {
            QUnit.equal(this.cards.length, 1, 'cards.length');
            QUnit.deepEqual(this.cards.toJSON(), [{id: 42, title: 'play!'}], 'cards');
            QUnit.start();
        }, this));
    });

});