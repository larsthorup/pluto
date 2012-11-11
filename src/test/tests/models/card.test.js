/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
require([
    'models/card'
], function (Card) {
    module('card.test');

    test('constructor', function () {
        // given
        var card = new Card({title: 'Buy milk'});

        // when
        var title = card.get('title');

        // then
        equal(title, 'Buy milk', 'title');
    });
});
