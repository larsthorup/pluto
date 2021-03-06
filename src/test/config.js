/*global window,require,QUnit*/
/*jslint vars:true nomen:true*/
window.config = function () {
    'use strict';
    require.config({
        baseUrl: '../app',

        paths: {
            // Note: Main application paths from app/config.js. DRY would be nice, but does not seem to be supported by RequireJS
            jquery: '../libs/jquery',
            underscore: '../libs/lodash',
            backbone: '../libs/backbone',
            tpl: '../libs/plugins/tpl',

            // Note: additional libraries used for testing
            // Note: base directory is app/, which is why ../test is necessary
            mockjax: '../test/libs/jquery.mockjax',
            sinon: '../test/libs/sinon',

            // Note: shortcuts used in testing
            tests: '../test/tests',
            stubs: '../test/stubs'
        },
        shim: {
            // Note: Main application shims from app/config.js. DRY would be nice, but does not seem to be supported by RequireJS
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },

            // Note: additional shims for libraries used for testing
            sinon: {
                exports: 'sinon'
            },
            mockjax: ['jquery']
        }
    });

    // Note: this needs to be in config.js, not in a separate main.js, otherwise grunt test will not work correctly...
    var testModules = [
        'tests/util.test',
        'tests/persistence/trello.test',
        'tests/models/session.test',
        'tests/models/card.test',
        'tests/collections/cards.test',
        'tests/collections/cards_trello_card.test',
        'tests/views/session.test',
        'tests/views/card.test',
        'tests/views/cards.test',
        'tests/views/cards_cards.test',
        'tests/app.test'
    ];
    if (window.location.protocol !== 'file:') {
        // Note: the tpl plugin for require.js uses XHR to load files which does not work when running the tests from a file: url
        testModules.push('tests/templateRepo.test');
        testModules.push('tests/views/session.html.test');
    }

    // Note: defer Qunit until RequireJS resolved all modules
    QUnit.config.autostart = false;
    QUnit.config.testTimeout = 1000;
    require(testModules, QUnit.start);
};

var requireResourceTrace = false;

// Note: enable to debug issues in module loading
if (requireResourceTrace) {
    require.onResourceLoad = function (context, map) { /*, depArray*/
        'use strict';
        window.console.log('Loaded ' + map.url);
    };
}