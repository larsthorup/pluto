/*global define,QUnit*/
define(function (require) {
    'use strict';
    var Session = require('models/session');

    QUnit.module('model.session');

    QUnit.test('defaults', function () {
        // when
        var session = new Session();
        
        // then
        QUnit.equal(session.get('userId'), null, 'session.userId');
    });
});