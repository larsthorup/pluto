/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Card = require('models/card');
    var CardsView = require('views/cards');

    QUnit.module('view.cards', {
        setup: function () {
            // given
            // ToDo: mock CardView so we won't have to include its template here
            var document = $('<div>' +
                '<div id="view"></div>' +
                '<script type="template/text" id="cards-template"><ul></ul></script>' +
                '<script type="template/text" id="cards-item-template"><li></li></script>' +
                '<script type="template/text" id="card-template"><%=title%></script>' +
                '</div>');
            this.collection = {};
            this.collection.on = sinon.spy();
            this.cardsView = new CardsView({
                document: document,
                collection: this.collection,
                el: $('#view', document)
            });
            this.cardsView.initialize();
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
        QUnit.equal(this.cardsView.$el.html(), '<ul></ul>', 'cardsView.html');
    });

    QUnit.test('addOne', function () {
        // given
        this.cardsView.render();
        var card = new Card({title: 'Buy cheese'});

        // when
        this.cardsView.addOne(card);

        // then
        QUnit.equal(this.cardsView.$el.html(), '<ul><li>Buy cheese</li></ul>', 'cardsView.html');
    });

    QUnit.test('addOne-failsBeforeRender', function () {
        // given
        var card = new Card({title: 'Buy cheese'});

        // when + then
        QUnit.throws(function () { this.cardsView.addOne(card); }, /assertion/, 'assertion');
    });
});