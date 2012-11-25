/*global window,require,QUnit*/
window.config = function () {
    'use strict';
    // Note: defer Qunit until RequireJS resolved all modules
    QUnit.config.autostart = false;
    QUnit.config.testTimeout = 1000;
    require.config({
        baseUrl: '../app',
        paths: {
            // JavaScript folders.
            libs: '../assets/js/libs',
            plugins: '../assets/js/plugins',
            vendor: '../assets/vendor',
            // Libraries.
            jquery: '../assets/js/libs/jquery',
            lodash: '../assets/js/libs/lodash',
            backbone: '../assets/js/libs/backbone',
            mockjax: '../test/vendor/jquery.mockjax',
            tests: '../test/tests' // Note: base directory is app/, which is why ../test is necessary
        },
        shim: {
            // Backbone library depends on lodash and jQuery.
            backbone: {
                deps: ['lodash', 'jquery'],
                exports: 'Backbone'
            },

            mockjax: ['jquery'],

            // Backbone.LayoutManager depends on Backbone.
            'plugins/backbone.layoutmanager': ['backbone']
        }
    });

    var testModules = [
        'tests/util.test',
        'tests/persistence/trello.test',
        'tests/models/session.test',
        'tests/models/card.test',
        'tests/collections/cards.test',
        'tests/views/base.test',
        'tests/views/session.test',
        'tests/views/card.test',
        'tests/views/cards.test',
        'tests/app.test'
    ];

    // Note
    require(testModules, QUnit.start);

};