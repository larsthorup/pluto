// ToDo: consider using domReady require.js plugin to inject document object
/*global define,document*/
define(function (require) {
    'use strict';
    var Card = require('models/card');
    var CardView = require('views/card');

    // Provide a global location to place configuration settings and module
    // creation.
    var app = {
        // The root path to run the application.
        root: '/'
    };

    // ToDo: load data from server
    var model = new Card({title: 'Meet Rob'});
    app.view = new CardView({document: document, model: model});
    // ToDo: how to avoid having to render the view manually?
    app.view.render();

    return app;
});
