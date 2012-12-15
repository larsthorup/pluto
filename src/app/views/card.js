/*global define*/
define(function (require) {
    'use strict';
    var BaseView = require('views/base');

    var CardView = BaseView.extend({

        events: function () { // Note: using a function because it allows us to reference methods by identifier (this.duplicate) instead of as a string ("duplicate")
            return {
                'click': this.duplicate
            };
        },

        initialize: function () {
            this.document = this.options.document;
            // ToDo: inject template
            this.template = this.makeTemplate('card-template');
            // ToDo: use an event broker instead of a direct collection reference?
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
    return CardView;
});
