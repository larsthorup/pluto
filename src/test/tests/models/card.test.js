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

    if (false) {
        var $ = require('jquery');
        QUnit.asyncTest('sync', function () {
            var trelloApiVersion = 1;
            var boardId = '4f8de470affc47647b1308b7';
            var url = 'https://api.trello.com/' + trelloApiVersion + '/board/' + boardId;
            var applicationKey = '4c5b4d16e6e53d893674f9452ac277bf';
            var userToken = '';
            var data = {
                key: applicationKey,
                token: userToken
            };
            $.ajax(url, { data: data, dataType: 'json', success: function (board) {
                QUnit.equal(board.name, 'Research', 'board.name');
                QUnit.start();
            }});
        });
    }
});
