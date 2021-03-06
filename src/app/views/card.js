/*global define*/
/*jslint vars:true*/
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
            this.template = this.templateRepo.card;
            // ToDo: use an event broker instead of a direct collection reference?
            this.model.on('change', this.render, this);
        },

        render: function () {
            // Note: improved performance using a 'data' variable to avoid having _.template() use the slow with statement
            // would be nice, but is not currently supported by the requirejs-tpl plugin
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        duplicate: function () {
            this.model.duplicate();
        }

    });
    return CardView;
});
