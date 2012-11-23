/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var BaseView = require('views/base');
    // var Session = require('models/session');

    var SessionView = BaseView.extend({
        events: function () {
            return {
                'click .login': this.login
            };
        },

        initialize: function () {
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
        }
    });

    return SessionView;
});