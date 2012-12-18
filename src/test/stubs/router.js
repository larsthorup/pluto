/*global define,sinon*/
define(function (require) {
    'use strict';
    var Router = require('router');
    // Note: we reuse the real Router object as its own stub, because it acts more like a framework class
    sinon.stub(Router.prototype, 'navigate');
    return Router;
});