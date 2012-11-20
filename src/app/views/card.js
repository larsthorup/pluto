/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
    var _ = require('lodash');

    var CardView = Backbone.View.extend({

        events: function () { // Note: using a function allows us to reference methods by identifier instead of as a string
            return {
                'click': this.duplicate
            };
        },

        initialize: function () {
            this.document = this.options.document;
            var $el = $('#card', this.document);
            this.setElement($el[0]);
            this.template = _.template($('#card-template', this.document).html());
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
