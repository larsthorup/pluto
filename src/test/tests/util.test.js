/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
require([
    'models/card'
], function () {
    // Note: fails
    // var Card = require('models/card');
    module('util');
    test('simple', function () {
        console.log('simple');
        equal(2 + 2, 4, 'kindergarten');
    });
});
