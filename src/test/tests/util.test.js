/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
define(function (/*require*/) {
    module('util');
    test('simple', function () {
        equal(2 + 2, 4, 'kindergarten');
    });
});
