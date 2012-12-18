/*global define,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');

    var CardsCollectionStub = function () {
    };
    CardsCollectionStub.fetchFailCount = 0;
    CardsCollectionStub.prototype = {
        fetch: sinon.spy(function () {
            var deferred = $.Deferred();
            if(CardsCollectionStub.fetchFailCount > 0) {
                CardsCollectionStub.fetchFailCount -= 1;
                deferred.reject(); // Note: simulate that fetch fails
            }
            return deferred;
        })
    };
    return CardsCollectionStub;
});