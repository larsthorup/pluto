/*global define,QUnit*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';

    // module under test
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

    QUnit.test('parse', function () {
        // given
        var response = {
            id: 43,
            name: 'sing?'
        };

        // when
        var item = Card.prototype.parse(response);

        // then
        QUnit.deepEqual(item, {id: 43, title: 'sing?'}, 'parse()');
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
