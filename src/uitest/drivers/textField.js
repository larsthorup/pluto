/*global define*/
define(function () {
    'use strict';

    var TextFieldDriver = function (className, $elem, $) {
        this.$ = $;
        this.$elem = $elem;
        this.className = className;
        this.label = this.$.trim(this.$('label.' + this.className, this.$elem).text());
    };
    TextFieldDriver.prototype = {
        input: function (value) {
            this.$('input.' + this.className, this.$elem).val(value);
        }
    };
    return TextFieldDriver;
});