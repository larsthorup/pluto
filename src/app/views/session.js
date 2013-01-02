/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var keycode = require('utility/keycode');

    var SessionView = Backbone.View.extend({
        events: function () {
            return {
                'click .login': this.login
            };
        },

        initialize: function () {
            this.templateRepo = this.options.dep.templateRepo;
            this.app = this.options.dep.app;
            this.model = this.options.dep.session;
            this.template = this.templateRepo.session;
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
            var userId = $('input.user', this.$el).val();
            this.model.login(userId);
            this.app.router.navigate('', {trigger: true});
        }
    });

    return SessionView;
});