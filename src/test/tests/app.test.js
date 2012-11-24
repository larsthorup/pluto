/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';

    var $ = require('jquery');
    var _ = require('lodash');
    var Router = require('router');
    var getApp = require('app');
    var BaseView = require('views/base');

    QUnit.module('app', {
        setup: function () {
            // given
            var dummyHtml = '<div></div>';
            this.document = $(dummyHtml);
            this.app = getApp();
            this.router = new Router();
            // ToDo: find a more elegant way to stub. Use a factory?
            // Note: mock CardsView so we won't have to include its template here
            sinon.stub(BaseView.prototype, 'makeTemplate', function () { return _.template(dummyHtml); });
        },
        teardown: function () {
            BaseView.prototype.makeTemplate.restore();
            this.app.destroy();
        }
    });

    QUnit.test('singleton', function () {
        // when
        var app = getApp();

        // then
        QUnit.equal(app, this.app, 'new App() returns a singleton');
    });

    QUnit.test('route:index-goCardsView', function () {
        // given
        this.app.bootstrap(this.document, this.router);

        // when
        this.app.router.trigger('route:index');

        // then
        QUnit.equal(this.app.view.collection.get(11).get('title'), 'Meet Rob', 'app.view.collection.get(11).title');
        QUnit.equal(this.app.view.collection.get(12).get('title'), 'Buy lunch', 'app.view.collection.get(12).title');
        QUnit.equal(this.app.view.collection.length, 2);
    });

    QUnit.test('route:login-goLogin', function () {
        // given
        this.app.bootstrap(this.document, this.router);

        // when
        this.app.router.trigger('route:login');

        // then
        QUnit.equal(this.app.view.model.get('userId'), null, 'app.view.model.userId');
    });
});
