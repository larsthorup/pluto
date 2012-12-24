/*global window,require,QUnit*/
window.config = function () {
    'use strict';
    require.config({
        baseUrl: '../app',

        paths: {
            jquery: '../libs/jquery',
            underscore: '../libs/lodash',
            backbone: '../libs/backbone',
            // Note: base directory is app/, which is why ../test is necessary
            waitFor: '../test/utility/jquery.waitFor',
            iqunit: '../test/utility/iqunit',
            tests: '../test/tests',
            drivers: '../test/drivers'
        },
        shim: {
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },

            mockjax: ['jquery'],
            waitFor: ['jquery']
        }
    });

    // Note: this needs to be in config.js, not in a separate main.js, otherwise grunt test will not work correctly...
    var testModules = [
        '../test/utility/jquery.waitFor.test'
    ];
    if (window.location.protocol !== 'file:') {
        testModules.push('tests/index.test');
    }

    // Note: defer Qunit until RequireJS resolved all modules
    QUnit.config.autostart = false;
    QUnit.config.testTimeout = 1000;
    require(testModules, QUnit.start);
};

var requireResourceTrace = true;

// Note: enable to debug issues in module loading
if (requireResourceTrace) {
    require.onResourceLoad = function (context, map/*, depArray*/) {
        'use strict';
        window.console.log('Loaded ' + map.url);
    };
}