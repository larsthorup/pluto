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
            this.template = this.makeTemplate('cards-template');
            this.itemTemplate = this.makeTemplate('cards-item-template');
        },

        render: function () {
            var html = this.template();
            this.$el.html(html);
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
            // ToDo: use template to pinpoint position to insert?
            this.$cards.append(cardHtml.el);
        },

        // ToDo: move this function to some utility class, or base View class
        makeTemplate: function (id) {
            var html = $('#' + id + '', this.document).html();
            if (!html) {
                throw new Error('assertion: template with id "' + id + '" not found');
            }
            return _.template(html);
        }
    });
    return CardsView;
});