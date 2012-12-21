/*global define*/
define(function (require) {
    'use strict';

    var HeaderDriver = function (selector, $) {
        this.$ = $;
        this.$elem = this.$(selector);
    };
    HeaderDriver.prototype = {
        text: function () {
            return this.$('h1', this.$elem).text();
        }
    };
    return HeaderDriver;
});