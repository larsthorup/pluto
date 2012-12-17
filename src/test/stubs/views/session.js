/*global define,sinon*/
define(function() {
    'use strict';
    var SessionViewStub = function () {

    };
    SessionViewStub.prototype = {
        render: sinon.stub()
    };
    return SessionViewStub;
});