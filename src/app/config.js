/*global require,window*/
require.config({
    deps: ['main'],

    paths: {
        jquery: '../libs/jquery',
        underscore: '../libs/lodash',
        backbone: '../libs/backbone',
        tpl: '../libs/plugins/tpl'
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

var requireResourceTrace = false;

// Note: enable to debug issues in module loading
if (requireResourceTrace) {
    require.onResourceLoad = function (context, map/*, depArray*/) {
        'use strict';
        window.console.log('Loaded ' + map.url);
    };
}