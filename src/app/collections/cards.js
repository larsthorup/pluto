/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');
    var Card = require('models/card');

    var CardCollection = Backbone.Collection.extend({
        url: '/cards',
        model: Card
    });

    return CardCollection;
});