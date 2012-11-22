/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Card = require('models/card');
    var CardView = require('views/card');
//    var CardCollection = require('collections/cards');
//    var CardsView = require('views/cards');

    // Provide a global location to place configuration settings and module
    // creation.
    var app = null;
    var getApp = function () {
        if (!app) { // Note: singleton pattern
            app = new App();
        }
        return app;
    };

    var App = function () {
        this.root = '/';
    };
    App.prototype = {
        bootstrap: function (document) {
            var model = new Card();
            this.view = new CardView({
                document: document,
                el: $('#main', document),
                model: model
            });
            // ToDo: load data from server
            model.set('title', 'Meet Rob');

            //    var collection = new CardCollection();
            //    var cardsView = new CardsView({
            //        document: document,
            //        el: $('#main', document),
            //        collection: collection
            //    });
            // cardsView.render();
            // app.view = cardsView;
            // collection.add(model);
        },
        reset: function () {
            app = null;
        }
    };

    return getApp;
});
