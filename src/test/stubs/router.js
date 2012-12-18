/*global define,sinon*/
define(function (require) {
    'use strict';
    var RouterStub = require('router');
    // Note: we reuse the real Router object as its own stub, because it acts more like a framework class
    sinon.stub(RouterStub.prototype, 'navigate');
    return RouterStub;
});