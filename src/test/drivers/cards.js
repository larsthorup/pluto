/*global define*/
define(function (require) {
    'use strict';

    var CardsDriver = function ($elem, $) {
        this.$ = $;
        this.$elem = $elem;
        this.cards = $.map(this.$elem, $.proxy(function (item) {
            return {
                text: this.$(item).text()
            };
        }, this));
    };
    CardsDriver.prototype = {
    };
    return CardsDriver;
});