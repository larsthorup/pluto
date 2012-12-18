/*global define,sinon*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');

    // Note: we use a backbone model as a stub to make it easily work with a collection
    var CardStub = Backbone.Model.extend({
        duplicate: sinon.spy(),
        render: function () {
            return {
                el: $('<div>' + this.get('title') + '</div>')
            };
        }
    });
    sinon.stub(CardStub.prototype, 'on');
    return CardStub;
});