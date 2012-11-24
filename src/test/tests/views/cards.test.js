/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Card = require('models/card');
    var CardsViewFactory = require('views/cards');
    var CardViewFactory = require('views/card');

    QUnit.module('view.cards', {
        setup: function () {
            // ToDo: DRY
            CardViewFactory.mockWith(function () {
                var fakeRender = function () { return {el: null}; };
                return sinon.spy(fakeRender);
            });
            // given
            var document = $('<div>' +
                '<div id="view"></div>' +
                '<script type="template/text" id="cards-template"><ul class="items"></ul></script>' +
                '<script type="template/text" id="cards-item-template"><li></li></script>' +
                '</div>');
            this.collection = {};
            this.collection.on = sinon.spy();
            this.cardsView = CardsViewFactory.create({
                document: document,
                collection: this.collection,
                el: $('#view', document)
            });
            this.cardsView.initialize();
        },
        teardown: function () {
            CardViewFactory.restore();
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
});