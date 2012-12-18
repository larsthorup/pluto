/*global define,QUnit*/
define(function (require) {
    'use strict';
    // ToDo: use stubs
    var Trello = require('persistence/trello');
    var Session = require('models/session');

    QUnit.module('model.session', {
        setup: function () {
            // given
            this.trello = new Trello();
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
        QUnit.equal(this.trello.token, 'joe', 'trello.token');
    });
});