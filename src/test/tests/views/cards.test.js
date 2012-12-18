/*global define,QUnit*/
define(function (require) {
    'use strict';

    // framework
    var $ = require('jquery');

    // module under test
    var CardsView = require('views/cards');

    // stubs
    var TemplateRepoStub = require('stubs/templateRepo');
    var TrelloStub = require('stubs/persistence/trello');
    var CardStub = require('stubs/models/card');
    var CardCollectionStub = require('stubs/collections/cards');
    var CardViewStub = require('stubs/views/card');

    QUnit.module('view.cards', {
        setup: function () {
            // given
            var templateRepo = new TemplateRepoStub({
                'cards': '<ul class="items"></ul>',
                'cardsItem': '<li></li>'
            });
            this.document = $('<div><div id="view"></div></div>');
            this.trello = new TrelloStub();
            this.collection = new CardCollectionStub([
                new CardStub({title: 'Buy cheese'}),
                new CardStub({title: 'Buy water'})
            ], {
                dep: {
                    trello: this.trello,
                    Card: CardStub
                }
            });
            this.cardsView = new CardsView({
                el: $('#view', this.document),
                dep: {
                    CardView: CardViewStub,
                    templateRepo: templateRepo,
                    cards: this.collection
                }
            });
        }
    });

    QUnit.test('render', function () {
        // when
        this.cardsView.render();

        // then
        QUnit.equal(this.cardsView.$el.html(), '<ul class="items"></ul>', 'cardsView.html');
    });

    QUnit.test('addOne', function () {
        // given
        this.cardsView.render();
        var card = new CardStub({title: 'Buy cheese'});

        // when
        this.cardsView.addOne(card);

        // then
        QUnit.equal(this.cardsView.$el.html(), '<ul class="items"><div>Buy cheese</div></ul>', 'cardsView.html');
    });

    QUnit.test('addOne-failsBeforeRender', function () {
        // given
        var card = new CardStub({title: 'Buy cheese'});

        // when + then
        QUnit.throws(function () { this.cardsView.addOne(card); }, /assertion/, 'assertion');
    });

    QUnit.test('addAll', function () {
        // given
        this.cardsView.render();

        // when
        this.cardsView.addAll();

        // then
        QUnit.equal(this.cardsView.$el.html(), '<ul class="items"><div>Buy cheese</div><div>Buy water</div></ul>', 'cardsView.html');
    });
});