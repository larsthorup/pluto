/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var keycode = require('utility/keycode');
    var ViewFactoryFactory = require('views/factory');

    var SessionView = Backbone.View.extend({
        events: function () {
            return {
                'click .login': this.login
            };
        },

        initialize: function () {
            this.app = this.options.app;
            this.templateRepo = this.options.dep.templateRepo;
            this.template = this.templateRepo.get('session');
            // ToDo: use an event broker instead of a direct collection reference?
            this.model = this.options.model;
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.keypress(_.bind(function (e) {
                if (e.which === keycode.ENTER) {
                    this.login();
                }
            }, this));
            return this;
        },

        login: function () {
            var userId = $('.user', this.$el).val();
            this.model.login(userId);
            this.app.router.navigate('', {trigger: true});
        }
    });

    var SessionViewFactory = ViewFactoryFactory.create(SessionView);
    return SessionViewFactory;
});