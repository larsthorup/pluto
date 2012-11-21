// ToDo: consider using domReady require.js plugin to inject document object
/*global define,document*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Card = require('models/card');
    var CardView = require('views/card');
//    var CardCollection = require('collections/cards');
//    var CardsView = require('views/cards');

    // Provide a global location to place configuration settings and module
    // creation.
    var app = {
        // The root path to run the application.
        root: '/'
    };

    var model = new Card();
    app.view = new CardView({
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

    return app;
});
