/*global require,window*/
require.config({
    deps: ['main'],

    paths: {
        jquery: '../assets/js/libs/jquery',
        underscore: '../assets/js/libs/lodash',
        backbone: '../assets/js/libs/backbone'
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
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