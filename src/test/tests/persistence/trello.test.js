/*global define,QUnit*/
define(function (require) {
    'use strict';

    // framework
    var Backbone = require('backbone');
    var sinon = require('sinon');

    // module under test
    var Trello = require('persistence/trello');

    QUnit.module('persistence.trello', {
        setup: function () {
            // given
            sinon.stub(Backbone, 'sync');
            this.trello = new Trello();
        },
        teardown: function () {
            Backbone.sync.restore();
        }
    });

    QUnit.test('login', function () {
        // when
        this.trello.login('samson');

        // then
        QUnit.equal(this.trello.token, 'samson', 'trello.token');
    });

    QUnit.test('sync', function () {
        // given
        this.trello.login('zeus');

        // when
        this.trello.sync('GET', 42, {data: {cards: 'open'}});

        // then
        QUnit.deepEqual(Backbone.sync.args[0], ['GET', 42, {data: {cards: 'open', key: this.trello.appKey, token: 'zeus'}}], 'Backbone.sync.args');
    });

    QUnit.test('sync-failsWhenNotLoggedIn', function () {
        // given
        this.trello.logout();

        // when + then
        QUnit.throws(function () { this.trello.sync(); }, /Assertion/, 'exception');
    });

});