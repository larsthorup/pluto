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
            mockjax: '../test/vendor/jquery.mockjax',
            tests: '../test/tests' // Note: base directory is app/, which is why ../test is necessary
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

    // Note
    require(testModules, QUnit.start);

};