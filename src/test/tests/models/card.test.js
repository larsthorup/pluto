/*global define,QUnit*/
define(function (require) {
    'use strict';
    var Card = require('models/card');

    QUnit.module('model.card');

    QUnit.test('constructor', function () {
        // given
        var card = new Card({title: 'Buy milk'});

        // when
        var title = card.get('title');

        // then
        QUnit.equal(title, 'Buy milk', 'title');
    });

    QUnit.test('duplicate', function () {
        // given
        var card = new Card({title: 'Mono'});

        // when
        card.duplicate();

        // then
        QUnit.equal(card.get('title'), 'MonoMono', 'title');
    });
});
