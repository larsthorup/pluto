/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Session = require('models/session');
    var SessionView = require('views/session');

    QUnit.module('views.session', {
        setup: function () {
            this.app = {
                router: {}
            };
            this.app.router.navigate = sinon.spy();
            this.document = $('<div>' +
                '<div id="view"></div>' +
                '<script type="text/template" id="session-template">' +
                '  <input class="user"/>' +
                '  <a class="login">Sign In</a>' +
                '</script>' +
            '</div>');
            this.session = new Session();
            this.session.login = sinon.spy();
            this.sessionView = new SessionView({
                app: this.app,
                document: this.document,
                el: $('#view', this.document),
                model: this.session
            });
        }
    });

    /*
    QUnit.test('initialize', function () {

    });
    */

    QUnit.test('render', function () {
        // when
        this.sessionView.render();

        // then
        QUnit.equal($('.user', this.document).val(), '', 'user');
        QUnit.equal($('.login', this.document).text(), 'Sign In', 'login');
    });


    QUnit.test('login', function () {
        // given
        this.sessionView.render();

        // when
        $('.user', this.document).val('lars');
        $('.login', this.document).click();

        // then
        QUnit.ok(this.session.login.calledWith('lars'));
        QUnit.ok(this.app.router.navigate.calledWith(''));
    });

});