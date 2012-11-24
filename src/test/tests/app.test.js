/*global define,QUnit,sinon*/
define(function (require) {
    'use strict';

    var $ = require('jquery');
    var _ = require('lodash');
    var Router = require('router');
    var getApp = require('app');
    var BaseView = require('views/base');
    var CardsViewFactory = require('views/cards');

    QUnit.module('app', {
        setup: function () {
            // given
            var dummyHtml = '<div></div>'; // ToDo: get rid of this
            this.document = $(dummyHtml);
            this.app = getApp();
            this.router = new Router();
            // ToDo: DRY
            // Note: mock CardsView so we won't have to include its template here
            CardsViewFactory.mock = {
                render: sinon.spy()
            };
            sinon.stub(CardsViewFactory, 'create', function () {
                return CardsViewFactory.mock;
            });
            // ToDo: getting rid of this
            sinon.stub(BaseView.prototype, 'makeTemplate', function () { return _.template(dummyHtml); });
        },
        teardown: function () {
            // ToDo: getting rid of this
            BaseView.prototype.makeTemplate.restore();
            CardsViewFactory.create.restore();
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
        QUnit.ok(CardsViewFactory.mock.render.calledOnce, 'CardsView.render.calledOnce');
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
