/*global define*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';
    var RouterStub = require('stubs/router');

    var AppStub = function () {
        this.router = new RouterStub();
    };
    return AppStub;
});