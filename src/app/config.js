/*global require,window*/
// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ['main'],

    paths: {
        // JavaScript folders.
        libs: '../assets/js/libs',
        plugins: '../assets/js/plugins',
        vendor: '../assets/vendor',

        // Libraries.
        jquery: '../assets/js/libs/jquery',
        underscore: '../assets/js/libs/lodash',
        backbone: '../assets/js/libs/backbone'
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        // Backbone.LayoutManager depends on Backbone.
        'plugins/backbone.layoutmanager': ['backbone']
    }
});

var requireResourceTrace = true;

// Note: enable to debug issues in module loading
if (requireResourceTrace) {
    require.onResourceLoad = function (context, map/*, depArray*/) {
        'use strict';
        window.console.log('Loaded ' + map.url);
    };
}