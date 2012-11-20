/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
    var _ = require('lodash');

    var CardsView = Backbone.View.extend({

        events: function () {
            return {

            };
        },

        initialize: function () {
            this.document = this.options.document;
            this.template = _.template($('#cards-template', this.document).html());
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return CardsView;
});