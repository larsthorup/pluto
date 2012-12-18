/*global define,sinon*/
define(function () {
    'use strict';
    var TrelloStub = function () {

    };
    TrelloStub.prototype = {
        login: sinon.spy()
    };
    return TrelloStub;
});