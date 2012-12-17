/*global window,require,QUnit*/
window.config = function () {
    'use strict';
    // Note: defer Qunit until RequireJS resolved all modules
    QUnit.config.autostart = false;
    QUnit.config.testTimeout = 1000;
    require.config({
        baseUrl: '../app',
        paths: {
            jquery: '../assets/js/libs/jquery',
            underscore: '../assets/js/libs/lodash',
            backbone: '../assets/js/libs/backbone',
            tpl: '../assets/js/plugins/tpl',
            // Note: base directory is app/, which is why ../test is necessary
            mockjax: '../test/vendor/jquery.mockjax',
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
        'tests/templateRepo.test',
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
        testModules.push('tests/requireTemplateRepo.test');
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