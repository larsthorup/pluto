/*global define*/
/*jslint vars:true nomen:true*/
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
