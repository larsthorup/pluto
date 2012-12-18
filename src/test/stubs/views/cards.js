/*global define,sinon*/
define(function () {
    'use strict';
    var CardsViewStub = function () {

    };
    CardsViewStub.prototype = {
        render: sinon.stub()
    };
    return CardsViewStub;
});