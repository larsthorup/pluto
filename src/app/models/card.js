/*global define*/
define([
    'backbone'
], function (Backbone) {
    'use strict';
    var CardModel = Backbone.Model.extend({
        defaults: { title: ''}
    });
    return CardModel;
});
