/*global define, QUnit*/
define(function (require) {
    'use strict';
    var Card = require('models/card');
    var Cards = require('collections/cards');

    QUnit.module('collection.cards');

    QUnit.test('model', function () {
        // given
        var cards = new Cards();

        // when
        cards.create({id: 42, title: 'Grow tomatoes'});

        // then
        QUnit.equal(cards.length, 1, 'cards.length');
        var card = cards.get(42);
        QUnit.ok(card instanceof Card, 'card instanceof Cards');
        QUnit.equal(card.get('title'), 'Grow tomatoes', 'card.title');
    });
});