/*global define,QUnit*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var CardsView = require('views/cards');

    QUnit.module('view/cards', {
        setup: function () {
            // given
            var document = $('<div><div id="view"></div><script type="template/text" id="cards-template"><ul></ul></script></div>');
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
});