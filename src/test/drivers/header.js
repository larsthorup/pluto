/*global define*/
define(function (require) {
    'use strict';

    var HeaderDriver = function (selector, $) {
        this.$ = $;
        this.$selector = this.$(selector);
    };
    HeaderDriver.prototype = {
        text: function () {
            return this.$('h1', this.$selector).text();
        }
    };
    return HeaderDriver;
});