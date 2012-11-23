/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'login': 'login'
        }
    });

    return Router;
});
