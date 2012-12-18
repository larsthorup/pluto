/*global define,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');

    var CardCollectionStub = function () {
    };
    CardCollectionStub.fetchFailCount = 0;
    CardCollectionStub.prototype = {
        fetch: sinon.spy(function () {
            var deferred = $.Deferred();
            if(CardCollectionStub.fetchFailCount > 0) {
                CardCollectionStub.fetchFailCount -= 1;
                deferred.reject(); // Note: simulate that fetch fails
            }
            return deferred;
        })
    };
    return CardCollectionStub;
});