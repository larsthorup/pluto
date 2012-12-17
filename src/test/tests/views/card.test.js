/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var TemplateRepoStub = require('stubs/templateRepo');
    var Card = require('models/card');
    var CardView = require('views/card');

    QUnit.module('view.card', {
        setup: function () {
            // given
            var templateRepo = new TemplateRepoStub({
                'card-template': '<span><%=title%></span>'
            });
            this.document = $('<div><div id="view"></div></div>');
            this.card = new Card({title: 'Meet Rob'});
            this.card.on = sinon.spy();
            this.card.duplicate = sinon.spy();
            this.cardView = new CardView({
                el: $('#view', this.document),
                model: this.card,
                dep: {
                    templateRepo: templateRepo
                }
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

