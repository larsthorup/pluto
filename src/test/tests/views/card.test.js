/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
define(function (require) {
    var Card = require('models/card');
    var CardView = require('views/card');

    module('view.card', {
        setup: function () {
            // given
            var document = $('<div><div id="card"></div><script type="template/text" id="card-template"><span><%=title%></span></script></div>');
            this.model = new Card({title: 'Meet Rob'});
            this.model.on = sinon.spy();
            this.cardView = new CardView({document: document, model: this.model});
            this.cardView.initialize();
        },
        teardown: function () {
            this.cardView.remove();
        }
    });

    test('render', function () {
        // when
        this.cardView.render();

        // then
        equal(this.cardView.$el.html(), '<span>Meet Rob</span>');
    });

    test('initialize', function () {
        // then
        ok(this.model.on.calledWith('change', this.cardView.render, this.cardView)); // Note: white box tests that we will re-render the view when model is updated
    });
});
