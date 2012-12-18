/*global define, QUnit*/
define(function (require) {
    'use strict';

    // module under test
    var CardCollection = require('collections/cards');

    // stubs
    var TrelloStub = require('stubs/persistence/trello');
    var CardStub = require('stubs/models/card');

    QUnit.module('collection.cards', {
        setup: function () {
            // given
            this.trello = new TrelloStub();
            this.cards = new CardCollection(null, {
                listId: 'abc',
                dep: {
                    trello: this.trello,
                    Card: CardStub
                }
            });
        }
    });

    QUnit.test('initialize', function () {
        // then
        QUnit.equal(this.cards.id, 'abc', 'cards.id');
    });

    QUnit.test('model', function () {
        // when
        this.cards.create({id: 42, headline: 'Grow tomatoes'});

        // then
        QUnit.equal(this.cards.length, 1, 'cards.length');
        var card = this.cards.get(42);
        QUnit.ok(card instanceof CardStub, 'card instanceof Card');
        QUnit.equal(card.get('headline'), 'Grow tomatoes', 'card.title');
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

});