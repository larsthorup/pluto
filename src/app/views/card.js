/*global define*/
define([
    'backbone'
], function (Backbone) {
    'use strict';
    var CardView = Backbone.View.extend({
        render: function() {
            // ToDo: use a template
            this.$el.html('<div>' + this.model.get('title') + '</div>');
            return this;
        }
    });
    return CardView;
});
