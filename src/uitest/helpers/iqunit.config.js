/*global define*/
/*jslint vars:true nomen:true*/
define(function () {
    'use strict';

    var config = {
        visible: true,
        injectScripts: ['/test/libs/jquery.mockjax.js', '/uitest/helpers/jquery.waitFor.js'],
        getJQueryUnderTest: function (window, callback) {
            // Note: we can get a reference to the local page's require object as soon as the iframe is loaded
            var require = window.require;
            var mainJsUrl = 'app/main.js';

            // Note: we know that all dependent modules have been loaded when the outermost dependency, app/main.js, has been loaded
            // ToDo: error handling
            require.onResourceLoad = function (context, map/*, depArray*/) {
                if (map.url === mainJsUrl) {

                    // Note: so then we can get a reference to the jQuery object in the app under test
                    var a$ = require('jquery');
                    callback(a$);
                }
            };
        }
    };
    return config;
});