/*global define*/
define(function (require) {
    'use strict';
    var sinon = require('sinon');

    var SessionViewStub = function () {

    };
    SessionViewStub.prototype = {
        render: sinon.stub()
    };
    return SessionViewStub;
});