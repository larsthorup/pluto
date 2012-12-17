/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    var CardView = Backbone.View.extend({

        events: function () { // Note: using a function because it allows us to reference methods by identifier (this.duplicate) instead of as a string ("duplicate")
            return {
                'click': this.duplicate
            };
        },

        initialize: function () {
            this.templateRepo = this.options.dep.templateRepo;
            this.template = this.templateRepo.get('card-template');
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
