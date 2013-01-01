/*global define*/
define(function (require) {
    'use strict';
    var RouterStub = require('router');
    var sinon = require('sinon');

    // Note: we reuse the real Router object as its own stub, because it acts more like a framework class
    sinon.stub(RouterStub.prototype, 'navigate');
    return RouterStub;
});