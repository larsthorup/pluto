/*global define*/
define(function (require) {
    'use strict';
    var RouterStub = require('stubs/router');

    var AppStub = function () {
        this.router = new RouterStub();
    };
    return AppStub;
});