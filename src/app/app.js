/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Card = require('models/card');
    var CardCollection = require('collections/cards');
    var CardsView = require('views/cards');

    var app = null;
    var getApp = function () {
        if (!app) { // Note: singleton pattern
            app = new App();
        }
        return app;
    };

    // Note: Provide a global location to place configuration settings and module creation.
    var App = function () {
        this.root = '/';
    };
    App.prototype = {
        bootstrap: function (document) {

            var collection = new CardCollection();
            var cardsView = new CardsView({
                document: document,
                el: $('#main', document),
                collection: collection
            });
            cardsView.render();
            this.view = cardsView;

            // ToDo: load data from server
            collection.add([
                new Card({id: 11, title: 'Meet Rob'}),
                new Card({id: 12, title: 'Buy lunch'})
            ]);
        },
        reset: function () {
            app = null;
        }
    };

    return getApp;
});
