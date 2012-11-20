/*global define,QUnit*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Card = require('models/card');
    var CardsView = require('views/cards');

    QUnit.module('view/cards', {
        setup: function () {
            // given
            // ToDo: mock CardView so we won't have to include its template here
            var document = $('<div>' +
                '<div id="view"></div>' +
                '<script type="template/text" id="cards-template"><ul></ul></script>' +
                '<script type="template/text" id="cards-item-template"><li></li></script>' +
                '<script type="template/text" id="card-template"><%=title%></script>' +
                '</div>');
            this.cardsView = new CardsView({
                document: document,
                el: $('#view', document)
            });
            this.cardsView.initialize();
        }
    });

    QUnit.test('render', function () {
        // when
        this.cardsView.render();

        // then
        QUnit.equal(this.cardsView.$el.html(), '<ul></ul>', 'cardsView.html');
    });

    QUnit.test('addOne', function () {
        // given
        var card = new Card({title: 'Buy cheese'});
        this.cardsView.render(); // Note: collection view must be rendered before we can render collection items

        // when
        this.cardsView.addOne(card);

        // then
        QUnit.equal(this.cardsView.$el.html(), '<ul><li>Buy cheese</li></ul>', 'cardsView.html');
    });
});