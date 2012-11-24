/*global define,QUnit,window*/
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
            // var boardId = '4f8de470affc47647b1308b7';
            var listId = '509070d37b1e65530d005067';
            var url = 'https://api.trello.com/' + trelloApiVersion + '/lists/' + listId;
            var applicationKey = '4c5b4d16e6e53d893674f9452ac277bf';
            var userToken = '';
            var data = {
                key: applicationKey,
                token: userToken,
                cards: 'open'
            };
            $.ajax(url, { data: data, dataType: 'json', success: function (list) {
                for (var i = 0; i < list.cards.length; i += 1) {
                    window.console.log(list.cards[i].name);
                }
                QUnit.equal(list.name, 'Planned', 'list.name');
                QUnit.start();
            }});
        });
    }
});
