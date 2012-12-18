/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var TemplateRepoStub = require('stubs/templateRepo');
    var Trello = require('persistence/trello');
    var Session = require('models/session');
    var SessionView = require('views/session');

    QUnit.module('view.session', {
        setup: function () {
            this.app = {
                router: {}
            };
            this.app.router.navigate = sinon.spy();
            var templateRepo = new TemplateRepoStub({
                'session': '<input class="user"/><a class="login">Sign In</a>'
            });
            this.document = $('<div><div id="view"></div></div>');
            this.trello = new Trello();
            this.session = new Session(null, {trello: this.trello});
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

    // ToDo: only load RequireTemplateRepo and run this test when running through a web server (not from file system)
    // var TemplateRepo = require('requireTemplateRepo');
//    QUnit.test('template', function () {
//        // given
//        var templateRepo = new TemplateRepo();
//
//        // when
//        var $html = $(templateRepo.get('session-template')());
//
//        // then
//        QUnit.ok($('.login', $html).length > 0, '.login');
//        QUnit.ok($('input.user', $html).length > 0, 'input.user');
//    });
});