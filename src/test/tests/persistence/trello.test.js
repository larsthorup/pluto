/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');
    var trello = require('persistence/trello');

    QUnit.module('persistence.trello', {
        setup: function () {
            sinon.stub(Backbone, 'sync');
        },
        teardown: function () {
            Backbone.sync.restore();
        }
    });

    QUnit.test('login', function () {
        // when
        trello.login('samson');

        // then
        QUnit.equal(trello.token, 'samson', 'trello.token');
    });

    QUnit.test('sync', function () {
        // given
        trello.login('zeus');

        // when
        trello.sync('GET', 42, {data: {cards: 'open'}});

        // then
        QUnit.deepEqual(Backbone.sync.args[0], ['GET', 42, {data: {cards: 'open', key: trello.appKey, token: 'zeus'}}], 'Backbone.sync.args');
    });

    QUnit.test('sync-failsWhenNotLoggedIn', function () {
        // given
        trello.logout();

        // when + then
        QUnit.throws(function () { trello.sync(); }, /Assertion/, 'exception');
    });

});