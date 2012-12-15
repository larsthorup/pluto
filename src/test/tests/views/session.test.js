/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Trello = require('persistence/trello');
    var Session = require('models/session');
    var SessionViewFactory = require('views/session');

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
            this.trello = new Trello(Backbone);
            this.session = new Session(this.trello);
            this.session.login = sinon.spy();
            this.sessionView = SessionViewFactory.create({
                app: this.app,
                document: this.document,
                el: $('#view', this.document),
                model: this.session
            });
        }
    });

    QUnit.test('render', function () {
        // when
        this.sessionView.render();

        // then
        QUnit.equal($('.user', this.document).val(), '', 'user');
        QUnit.equal($('.login', this.document).text(), 'Sign In', 'login');
    });


    QUnit.test('login-click', function () {
        // given
        this.sessionView.render();

        // when
        $('.user', this.document).val('lars');
        $('.login', this.document).click();

        // then
        QUnit.ok(this.session.login.calledWith('lars'));
        QUnit.ok(this.app.router.navigate.calledWith(''));
    });

    QUnit.test('user-enter', function () {
        // given
        this.sessionView.render();

        // when
        $('.user', this.document).val('lars');
        $('.user', this.document).trigger($.Event('keypress', {which: 13}));

        // then
        QUnit.ok(this.session.login.calledWith('lars'));
        QUnit.ok(this.app.router.navigate.calledWith(''));
    });

});