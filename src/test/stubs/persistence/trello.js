/*global define*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';
    var sinon = require('sinon');

    var TrelloStub = function () {
    };
    TrelloStub.prototype = {
        login: sinon.spy()
    };
    return TrelloStub;
});