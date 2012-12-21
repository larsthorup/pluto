/*global define*/
define(function (require) {
    'use strict';

    var TextFieldDriver = function (className, $elem, $) {
        this.$ = $;
        this.$elem = $elem;
        this.label = this.$.trim(this.$('label.' + className + 'Label', $elem).text());
    };
    TextFieldDriver.prototype = {
    };
    return TextFieldDriver;
});