/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Card = require('models/card');
    var CardsViewFactory = require('views/cards');
    var CardViewFactory = require('views/card');
    var CardsCollectionFactory = require('collections/cards');

    QUnit.module('view.cards', {
        setup: function () {
            // ToDo: implement default return value in the mock instead of here
            CardViewFactory.mockWith(sinon.spy, { render: function () { return {el: null}; } });
            // given
            this.document = $('<div>' +
                '<div id="view"></div>' +
                '<script type="template/text" id="cards-template"><ul class="items"></ul></script>' +
                '<script type="template/text" id="cards-item-template"><li></li></script>' +
                '</div>');
            this.collection = CardsCollectionFactory.create([new Card({title: 'Buy cheese'}), new Card({title: 'Buy water'})]);
            this.cardsView = CardsViewFactory.create({
                document: this.document,
                collection: this.collection,
                el: $('#view', this.document)
            });
            this.cardsView.initialize();
        },
        teardown: function () {
            CardViewFactory.restore();
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
        QUnit.ok(CardViewFactory.mock.render.calledOnce, 'CardView.render.calledOnce');
        // ToDo: make card.render return something so we can test it was inserted
        QUnit.equal(this.cardsView.$el.html(), '<ul class="items"></ul>', 'cardsView.html');
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
        QUnit.equal(CardViewFactory.mock.render.callCount, 2, 'CardView.render.callCount');
    });

    QUnit.test('collection.add', function () {
        // given
        this.cardsView.render();

        // when
        this.collection.add(new Card({title: 'Buy tomatoes'}));

        // then
        QUnit.ok(CardViewFactory.mock.render.callCount, 'CardView.render.calledOnce');
    });
});