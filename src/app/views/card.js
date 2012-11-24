/*global define*/
define(function (require) {
    'use strict';
    var BaseView = require('views/base');
    var ViewFactoryFactory = require('views/factory');

    var CardView = BaseView.extend({

        events: function () { // Note: using a function because it allows us to reference methods by identifier (this.duplicate) instead of as a string ("duplicate")
            return {
                'click': this.duplicate
            };
        },

        initialize: function () {
            this.document = this.options.document;
            this.template = this.makeTemplate('card-template');
            this.model.on('change', this.render, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        duplicate: function () {
            this.model.duplicate();
        }

    });
    var CardViewFactory = ViewFactoryFactory.create(CardView);
    return CardViewFactory;
});
