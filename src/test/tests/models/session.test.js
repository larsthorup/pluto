/*global define,QUnit*/
define(function (require) {
    'use strict';
    var trello = require('persistence/trello');
    var Session = require('models/session');

    QUnit.module('model.session', {
        setup: function () {
            // given
            this.session = new Session();
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
        QUnit.equal(trello.token, 'xjoe', 'trello.token');
    });
});