/*global window,require,QUnit*/
window.config = function () {
    'use strict';
    // Note: defer Qunit until RequireJS resolved all modules
    QUnit.config.autostart = false;
    QUnit.config.testTimeout = 1000;
    require.config({
        baseUrl: '../app',
        paths: {
            jquery: '../libs/jquery',
            underscore: '../libs/lodash',
            backbone: '../libs/backbone',
            tpl: '../libs/plugins/tpl',
            // Note: base directory is app/, which is why ../test is necessary
            mockjax: '../test/libs/jquery.mockjax',
            tests: '../test/tests',
            stubs: '../test/stubs'
        },
        shim: {
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },

            mockjax: ['jquery']
        }
    });

    var testModules = [
        'tests/util.test',
        'tests/persistence/trello.test',
        'tests/models/session.test',
        'tests/models/card.test',
        'tests/collections/cards.test',
        'tests/views/session.test',
        'tests/views/card.test',
        'tests/views/cards.test',
        'tests/app.test'
    ];
    if (window.location.protocol !== 'file:') {
        // Note: the tpl plugin for require.js uses XHR to load files which does not work when running the tests from a file: url
        testModules.push('tests/templateRepo.test');
        testModules.push('tests/views/session.html.test');
    }

    // Note
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