/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
require([
    'views/card',
    'models/card'
], function (CardView, CardModel) {
    module('view.card', {
        setup: function () {
            var document = $('<div><div id="card"></div><script type="template/text" id="card-template"><span><%=title%></span></script></div>');
            var model = new CardModel({title: 'Meet Rob'});
            this.cardView = new CardView({document: document, model: model});
            this.cardView.initialize();
        },
        teardown: function () {
            this.cardView.remove();
        }
    });

    test('render', function () {
        // given

        // when
        this.cardView.render();

        // then
        equal(this.cardView.$el.html(), '<span>Meet Rob</span>');
    });
});
