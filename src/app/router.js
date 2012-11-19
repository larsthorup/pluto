/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },
        index: function () {
        }
    });

    return Router;
});
