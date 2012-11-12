/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
require([
    'views/card',
    'models/card'
], function (CardView, CardModel) {
    module('view.card', {
        setup: function() {
            // ToDo: can we avoid having the view being dependent on the QUnit DOM?
            $('body').append('<div id="card"></div>');
            var model = new CardModel({title: 'Meet Rob'});
            this.cardView = new CardView({model: model});
        },
        teardown: function() {
            this.cardView.remove();
            $('#card').remove();
        }
    });

    test('render', function () {
        // given

        // when
        this.cardView.render();

        // then
        equal(this.cardView.$el.html(), '<div>Meet Rob</div>');
    });
});
