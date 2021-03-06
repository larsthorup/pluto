/*global define*/
/*jslint vars:true*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    var CardCollection = Backbone.Collection.extend({

        constructor: function (models, options) {
            Backbone.Collection.apply(this, arguments);
            this.trello = options.dep.trello;
            this.model = options.dep.Card;
        },

        url: function () {
            return this.trello.url + '/lists/' + this.id;
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

        sync: function (method, model, options) {
            return this.trello.sync(method, model, options);
        }
    });

    return CardCollection;
});