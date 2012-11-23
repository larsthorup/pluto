/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Card = require('models/card');
    var CardView = require('views/card');

    QUnit.module('view.card', {
        setup: function () {
            // given
            this.document = $('<div><div id="view"></div><script type="template/text" id="card-template"><span><%=title%></span></script></div>');
            this.model = new Card({title: 'Meet Rob'});
            this.model.on = sinon.spy();
            this.model.duplicate = sinon.spy();
            this.cardView = new CardView({
                document: this.document,
                el: $('#view', this.document),
                model: this.model
            });
            this.cardView.initialize();
        },
        teardown: function () {
            this.cardView.remove();
        }
    });

    QUnit.test('initialize', function () {
        // then
        QUnit.ok(this.model.on.calledWith('change', this.cardView.render, this.cardView), 'model.on'); // Note: white box tests that we will re-render the view when model is updated
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
        QUnit.ok(this.model.duplicate.calledOnce, 'model.duplicate');
    });
});

