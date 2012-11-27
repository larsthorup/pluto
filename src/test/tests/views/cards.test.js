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
            CardsCollectionFactory.mockWith(sinon.spy);
            // given
            this.document = $('<div>' +
                '<div id="view"></div>' +
                '<script type="template/text" id="cards-template"><ul class="items"></ul></script>' +
                '<script type="template/text" id="cards-item-template"><li></li></script>' +
                '</div>');
            this.collection = CardsCollectionFactory.create();
            // ToDo: better mock of collection, or use real collection
            this.collection.each = function (fn, obj) {
                fn.call(obj, new Card({title: 'Buy cheese'}));
                fn.call(obj, new Card({title: 'Buy water'}));
            };
            this.cardsView = CardsViewFactory.create({
                document: this.document,
                collection: this.collection,
                el: $('#view', this.document)
            });
            this.cardsView.initialize();
        },
        teardown: function () {
            CardViewFactory.restore();
            CardsCollectionFactory.restore();
        }
    });

    QUnit.test('initialize', function () {
        // then
        QUnit.ok(this.collection.on.calledWith('add', this.cardsView.addOne, this.cardsView), 'collection.on'); // Note: white box tests that we will re-render the view when collection grows
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
        QUnit.equal(CardViewFactory.mock.render.callCount, 2, 'CardView.render.calledOnce');
        // ToDo: assert that it is only called once
    });
});