/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
define(function (require) {
    var Card = require('models/card');
    module('model.card');

    test('constructor', function () {
        // given
        var card = new Card({title: 'Buy milk'});

        // when
        var title = card.get('title');

        // then
        equal(title, 'Buy milk', 'title');
    });

    test('duplicate', function () {
        // given
        var card = new Card({title: 'Mono'});

        // when
        card.duplicate();

        // then
        equal(card.get('title'), 'MonoMono', 'title');
    });
});
