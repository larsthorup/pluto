/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
    var BaseView = require('views/base');
    var ViewFactoryFactory = require('views/factory');

    /**
     * @extends BaseView
     */
    var CardsView = BaseView.extend({

        constructor: function (options) {
            Backbone.View.apply(this, arguments);
            this.CardView = options.CardView;
        },

        events: function () {
            return {

            };
        },

        initialize: function () {
            this.document = this.options.document;
            // ToDo: use an event broker instead of a direct collection reference?
            this.collection = this.options.collection;
            // ToDo: Use symbolic event ids instead of strings
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
            // ToDo: Use symbolic template ids instead of strings
            // ToDO: inject templates
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
            var cardView = new this.CardView({
                document: this.document,
                el: this.itemTemplate(),
                model: card
            });
            var cardHtml = cardView.render();
            // ToDo: use template to pinpoint position to insert?
            this.$cards.append(cardHtml.el);
        },

        addAll: function () {
            this.$cards.html('');
            this.collection.each(this.addOne, this);
        }

    });
    var CardsViewFactory = ViewFactoryFactory.create(CardsView);
    return CardsViewFactory;
});