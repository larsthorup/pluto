/*global define*/
define(function (require) {
    'use strict';
    var sinon = require('sinon');

    var CardsViewStub = function () {
    };
    CardsViewStub.prototype = {
        render: sinon.stub()
    };
    return CardsViewStub;
});