/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
define(function (require) {
    var app = require('app');
    module('app', {
        setup: function () {
            // given
            // this.app = new App();
        }
    });

    test('construction', function () {
        // then
        equal(app.view.model.get('title'), 'Meet Rob', 'app.view.model.title');
    });
});
