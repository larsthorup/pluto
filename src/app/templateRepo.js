/*global define*/
define(function (require) {
    'use strict';
    var session = require('tpl!views/session.html');
    var card = require('tpl!views/card.html');
    var cards = require('tpl!views/cards.html');
    var cardsItem = require('tpl!views/cardsItem.html');

    var templateRepo = {
        session: session,
        card: card,
        cards: cards,
        cardsItem: cardsItem
    };
    return templateRepo;
});