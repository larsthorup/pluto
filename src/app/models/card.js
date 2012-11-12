/*global define*/
define([
    'backbone'
], function (Backbone) {
    'use strict';
    var Card = Backbone.Model.extend({
        defaults: { title: ''}
    });
    return Card;
});
