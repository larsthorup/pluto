/*global define,QUnit*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';

    // framework
    var $ = require('jquery');

    // modules under test
    var CardsView = require('views/cards');
    var CardCollection = require('collections/cards');
    var Card = require('models/card'); // Note: Collection.add need a functioning Model.on-method

    // stubs
    var TemplateRepoStub = require('stubs/templateRepo');
    var TrelloStub = require('stubs/persistence/trello');
    var CardViewStub = require('stubs/views/card');

    QUnit.module('view.cards_cards', {
        setup: function () {
            // given
            var templateRepo = new TemplateRepoStub({
                'cards': '<ul class="items"></ul>',
                'cardsItem': '<li></li>'
            });
            this.document = $('<div><div id="view"></div></div>');
            this.trello = new TrelloStub();
            this.collection = new CardCollection(null, {
                dep: {
                    trello: this.trello,
                    Card: Card
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

    QUnit.test('collection.add', function () {
        // given
        this.cardsView.render();

        // when
        this.collection.add(new Card({title: 'Buy tomatoes'}));

        // then
        QUnit.equal(this.cardsView.$el.html(), '<ul class="items"><div>Buy tomatoes</div></ul>', 'cardsView.html');
    });
});