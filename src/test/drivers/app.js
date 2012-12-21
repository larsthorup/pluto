/*global define*/
define(function (require) {
    'use strict';
    var HeaderDriver = require('drivers/header');

    var AppDriver = function ($) {
        this.$ = $;
        this.header = new HeaderDriver('#header', this.$);
    };
    AppDriver.prototype = {
    };
    return AppDriver;
});