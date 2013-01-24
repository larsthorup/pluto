/*global define*/
/*jslint vars:true nomen:true*/
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