/*global define*/
define([
    'backbone'
], function (Backbone) {
    'use strict';
    var CardView = Backbone.View.extend({
        initialize: function() {
            this.document = this.options.document;
            var $el = $('#card', this.document);
            this.setElement($el[0]);
        },
        render: function() {
            // ToDo: use a template
            this.$el.html('<div>' + this.model.get('title') + '</div>');
            return this;
        }
    });
    return CardView;
});
