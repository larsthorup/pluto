/*global define*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
    var sinon = require('sinon');

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