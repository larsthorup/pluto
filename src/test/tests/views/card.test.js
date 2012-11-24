/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Card = require('models/card');
    var CardViewFactory = require('views/card');

    QUnit.module('view.card', {
        setup: function () {
            // given
            this.document = $('<div><div id="view"></div><script type="template/text" id="card-template"><span><%=title%></span></script></div>');
            this.card = new Card({title: 'Meet Rob'});
            this.card.on = sinon.spy();
            this.card.duplicate = sinon.spy();
            this.cardView = CardViewFactory.create({
                document: this.document,
                el: $('#view', this.document),
                model: this.card
            });
            this.cardView.initialize();
        },
        teardown: function () {
            this.cardView.remove();
        }
    });

    QUnit.test('initialize', function () {
        // then
        QUnit.ok(this.card.on.calledWith('change', this.cardView.render, this.cardView), 'card.on'); // Note: white box tests that we will re-render the view when model is updated
    });

    QUnit.test('render', function () {
        // when
        this.cardView.render();

        // then
        QUnit.equal(this.cardView.$el.html(), '<span>Meet Rob</span>', 'cardView.html');
    });

    QUnit.test('click-duplicate', function () {
        // when
        $('#view', this.document).click();

        // then
        QUnit.ok(this.card.duplicate.calledOnce, 'card.duplicate');
    });
});

