/*global define*/
/*jslint vars:true nomen:true*/
define(function () {
    'use strict';

    var TextFieldDriver = function (className, $elem, $) {
        this.$ = $;
        this.$elem = $elem;
        this.className = className;
        this.label = this.$.trim(this.$('label.' + this.className, this.$elem).text());
        this.$input = this.$('input.' + this.className, this.$elem);
    };
    TextFieldDriver.prototype = {
        input: function (value) {
            this.$input.val(value);
        },
        val: function () {
            return this.$input.val();
        }
    };
    return TextFieldDriver;
});