/*global define,QUnit*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';

    // module under test
    var Session = require('models/session');

    // stubs
    var TrelloStub = require('stubs/persistence/trello');

    QUnit.module('model.session', {
        setup: function () {
            // given
            this.trello = new TrelloStub();
            this.session = new Session(null, {trello: this.trello});
        }
    });

    QUnit.test('defaults', function () {
        // then
        QUnit.equal(this.session.get('userId'), null, 'session.userId');
    });

    QUnit.test('login', function () {
        // when
        this.session.login('joe');

        // then
        QUnit.equal(this.session.get('userId'), 'joe', 'session.userId');
        QUnit.ok(this.trello.login.calledWith('joe'), 'trello.login.calledWith');
    });
});