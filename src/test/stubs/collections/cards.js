/*global define,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');

    // Note: we use a backbone collection as a stub to make it easily work with a view
    var CardCollectionStub = Backbone.Collection.extend();
    CardCollectionStub.fetchFailCount = 0;
    sinon.stub(CardCollectionStub.prototype, 'fetch', function () {
        var deferred = $.Deferred();
        if (CardCollectionStub.fetchFailCount > 0) {
            CardCollectionStub.fetchFailCount -= 1;
            deferred.reject(); // Note: simulate that fetch fails
        }
        return deferred;
    });
    return CardCollectionStub;
});