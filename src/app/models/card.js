/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    var Card = Backbone.Model.extend({
        defaults: { title: ''}
    });
    return Card;
});
