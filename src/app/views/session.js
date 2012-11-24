/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var BaseView = require('views/base');

    var SessionView = BaseView.extend({
        events: function () {
            return {
                'click .login': this.login
            };
        },

        initialize: function () {
            this.app = this.options.app;
            this.document = this.options.document;
            this.template = this.makeTemplate('session-template');
            this.model = this.options.model;
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        login: function () {
            var userId = $('.user', this.$el).val();
            this.model.login(userId);
            this.app.router.navigate('', {trigger: true});
        }
    });

    // ToDo: DRY
    var SessionViewFactory = {
        create: function (options) {
            return new SessionView(options);
        },
        mockWith: function (spy) {
            SessionViewFactory.mock = {
                render: spy()
            };
            SessionViewFactory._create = SessionViewFactory.create;
            SessionViewFactory.create = function () {
                return SessionViewFactory.mock;
            };
        },
        restore: function () {
            SessionViewFactory.create = SessionViewFactory._create;
        }
    };

    return SessionViewFactory;
});