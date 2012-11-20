/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
define(function (require) {
    var Card = require('models/card');
    var Cards = require('collections/cards');

    module('collection.cards');

    test('model', function () {
        // given
        var cards = new Cards();

        // when
        cards.create({id: 42, title: 'Grow tomatoes'});

        // then
        equal(cards.length, 1, 'cards.length');
        var card = cards.get(42);
        ok(card instanceof Card, 'card instanceof Cards');
        equal(card.get('title'), 'Grow tomatoes', 'card.title');
    });
});