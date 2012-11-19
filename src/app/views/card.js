/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
    var _ = require('lodash');

    var CardView = Backbone.View.extend({
        initialize: function () {
            this.document = this.options.document;
            var $el = $('#card', this.document);
            this.setElement($el[0]);
            // Note: cache the template
            this.template = _.template($('#card-template', this.document).html());
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return CardView;
});
