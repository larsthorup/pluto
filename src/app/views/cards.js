/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var BaseView = require('views/base');
    var CardView = require('views/card');

    /**
     * @extends BaseView
     */
    var CardsView = BaseView.extend({

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
            this.$cards = $('.items', this.$el);
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
        }

    });
    var CardsViewFactory = {
        create: function (options) {
            return new CardsView(options);
        }
    };
    return CardsViewFactory;
});