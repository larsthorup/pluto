/*global define*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';
    var $ = require('jquery');

    var CardViewStub = function (options) {
        this.model = options.model;
    };
    CardViewStub.prototype = {
        render: function () {
            return {el: $('<div>' + this.model.get('title') + '</div>')};
        }
    };
    return CardViewStub;
});