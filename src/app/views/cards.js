/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
    var _ = require('lodash');
    var CardView = require('views/card');

    var CardsView = Backbone.View.extend({

        events: function () {
            return {

            };
        },

        initialize: function () {
            this.document = this.options.document;
            this.collection = this.options.collection;
            this.collection.on('add', this.addOne, this);
            this.template = _.template($('#cards-template', this.document).html());
            this.itemTemplate = _.template($('#cards-item-template', this.document).html());
        },

        render: function () {
            this.$el.html(this.template());
            this.$cards = $('ul', this.$el);
            return this;
        },

        addOne: function (card) {
            if (!this.$cards) {
                throw new Error('CardsView assertion failed: must call render() before calling addOne()');
            }
            var cardView = new CardView({
                document: this.document,
                el: this.itemTemplate(),
                model: card
            });
            var cardHtml = cardView.render();
            this.$cards.append(cardHtml.el);
        }
    });
    return CardsView;
});