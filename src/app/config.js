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
        lodash: '../assets/js/libs/lodash',
        backbone: '../assets/js/libs/backbone'
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },

        // Backbone.LayoutManager depends on Backbone.
        'plugins/backbone.layoutmanager': ['backbone']
    }

});

// Note: enable to debug issues in module loading
require.onResourceLoad = function (context, map/*, depArray*/) {
    'use strict';
    window.console.log('Loaded ' + map.url);
};