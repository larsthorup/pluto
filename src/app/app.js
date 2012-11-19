/*global define,window*/
// ToDo: inject window
define([
    // Libraries.
    'jquery',
    'lodash',
    'backbone',

    // Our app code
    'models/card',
    'views/card',

    // Plugins.
    'plugins/backbone.layoutmanager'
],

function ($, _, Backbone, Card, CardView) {
    'use strict';

    // Provide a global location to place configuration settings and module
    // creation.
    var app = {
        // The root path to run the application.
        root: '/'
    };

    // ToDo: load data from server
    var model = new Card({title: 'Meet Rob'});
    app.view = new CardView({document: window.document, model: model});
    // ToDo: how to avoid having to render the view manually?
    app.view.render();

    return app;
});
