/*global define*/
define([
    'backbone'
], function (Backbone) {
    'use strict';
    var CardView = Backbone.View.extend({
        initialize: function() {
            var $el = $('#card', this.options.document);
            this.setElement($el[0]);
        },
        render: function() {
            // ToDo: how to cache the template?
            var template = _.template($('#card-template', this.options.document).html());
            // ToDo: why toJSON??
            this.$el.html(template(this.model.toJSON()));
            return this;
        }
    });
    return CardView;
});
