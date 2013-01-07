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
            waitFor: '../uitest/helpers/jquery.waitFor',
            iqunit: '../uitest/helpers/iqunit',
            tests: '../uitest/tests',
            drivers: '../uitest/drivers'
        },
        shim: {
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },

            waitFor: ['jquery']
        }
    });

    // Note: this needs to be in config.js, not in a separate main.js, otherwise grunt test will not work correctly...
    var testModules = [
        'tests/helpers/jquery.waitFor.test',
        'tests/helpers/iqunit.test'
    ];
    if (window.location.protocol !== 'file:') {
        testModules.push('tests/scenarios/authentication.test');
    }

    // Note: defer Qunit until RequireJS resolved all modules
    QUnit.config.autostart = false;
    require(testModules, QUnit.start);
};

var requireResourceTrace = false;

// Note: enable to debug issues in module loading
if (requireResourceTrace) {
    require.onResourceLoad = function (context, map/*, depArray*/) {
        'use strict';
        window.console.log('Loaded ' + map.url);
    };
}