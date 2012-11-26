/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');
    var trello = require('persistence/trello');
    var Card = require('models/card');
    var CollectionFactoryFactory = require('collections/factory');

    var CardCollection = Backbone.Collection.extend({

        model: Card,

        url: function () {
            return trello.url + '/lists/' + this.id;
        },

        initialize: function (models, options) {
            this.id = options.listId;
        },

        parse: function (response) {
            return response.cards;
        },

        fetch: function () {
            var options = {
                data: {
                    cards: 'open'
                }
            };
            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        sync: trello.sync
    });

    var CardCollectionFactory = CollectionFactoryFactory.create(CardCollection);
    return CardCollectionFactory;
});