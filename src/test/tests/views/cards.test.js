/*global define,QUnit*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
    var TemplateRepo = require('templateRepo');
    var Trello = require('persistence/trello');
    var Card = require('models/card');
    var CardsViewFactory = require('views/cards');
    var CardsCollectionFactory = require('collections/cards');

    QUnit.module('view.cards', {
        setup: function () {
            // ToDo: implement default return value in the mock instead of here
            var CardView = function (options) {
                this.model = options.model;
            };
            CardView.prototype = {
                render: function () {
                    return {el: $('<div>' + this.model.get('title') + '</div>')};
                }
            };
            // given
            // ToDo: use a TemplateRepoStub
            this.document = $('<div>' +
                '<div id="view"></div>' +
                '<script type="template/text" id="cards-template"><ul class="items"></ul></script>' +
                '<script type="template/text" id="cards-item-template"><li></li></script>' +
                '</div>');
            var templateRepo = new TemplateRepo(this.document);
            this.trello = new Trello(Backbone);
            this.collection = CardsCollectionFactory.create([new Card({title: 'Buy cheese'}), new Card({title: 'Buy water'})], {trello: this.trello});
            this.cardsView = CardsViewFactory.create({
                document: this.document,
                collection: this.collection,
                el: $('#view', this.document),
                dep: {
                    CardView: CardView,
                    templateRepo: templateRepo
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
        var card = new Card({title: 'Buy cheese'});

        // when
        this.cardsView.addOne(card);

        // then
        QUnit.equal(this.cardsView.$el.html(), '<ul class="items"><div>Buy cheese</div></ul>', 'cardsView.html');
    });

    QUnit.test('addOne-failsBeforeRender', function () {
        // given
        var card = new Card({title: 'Buy cheese'});

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

    QUnit.test('collection.add', function () {
        // given
        this.cardsView.render();

        // when
        this.collection.add(new Card({title: 'Buy tomatoes'}));

        // then
        QUnit.equal(this.cardsView.$el.html(), '<ul class="items"><div>Buy tomatoes</div></ul>', 'cardsView.html');
    });
});