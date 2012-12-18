/*global define, QUnit*/
define(function (require) {
    'use strict';

    // framework
    var _ = require('underscore');
    var $ = require('jquery');
    require('mockjax');

    // modules under test
    var CardCollection = require('collections/cards');
    var Trello = require('persistence/trello');
    var Card = require('models/card');

    QUnit.module('collection.cards_trello_card', {
        setup: function () {
            // given
            this.trello = new Trello();
            this.cards = new CardCollection(null, {
                listId: 'abc',
                dep: {
                    trello: this.trello,
                    Card: Card
                }
            });
        }
    });

    QUnit.asyncTest('fetch', function () {
        // given
        this.trello.login('lars');
        $.mockjax({
            log: null,
            url: 'https://api.trello.com/1/lists/abc',
            data: {
                key: this.trello.appKey,
                token: 'lars',
                cards: 'open'
            },
            responseTime: 1,
            responseText: {
                cards: [{id: 42, name: 'play!'}]
            }
        });

        // when
        var fetchPromise = this.cards.fetch();

        // then
        fetchPromise.done(_.bind(function () {
            QUnit.equal(this.cards.length, 1, 'cards.length');
            QUnit.deepEqual(this.cards.toJSON(), [{id: 42, title: 'play!'}], 'cards');
            QUnit.start();
        }, this));
    });

});