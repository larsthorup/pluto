/*global define,QUnit*/
define(function (require) {
    'use strict';

    // framework
    var $ = require('jquery');
    var sinon = require('sinon');

    // module under test
    var SessionView = require('views/session');

    // stubs
    var TemplateRepoStub = require('stubs/templateRepo');
    var TrelloStub = require('stubs/persistence/trello');
    var SessionStub = require('stubs/models/session');
    var AppStub = require('stubs/app');

    QUnit.module('view.session', {
        setup: function () {
            this.app = new AppStub();
            var templateRepo = new TemplateRepoStub({
                'session': '<label class="user"><input class="user"/></label><a class="login">Sign In</a>'
            });
            this.document = $('<div><div id="view"></div></div>');
            this.trello = new TrelloStub();
            this.session = new SessionStub(null, {trello: this.trello});
            this.session.login = sinon.spy();
            this.sessionView = new SessionView({
                el: $('#view', this.document),
                dep: {
                    templateRepo: templateRepo,
                    app: this.app,
                    session: this.session
                }
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
        $('input.user', this.document).val('lars');
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