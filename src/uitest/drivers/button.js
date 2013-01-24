/*global define*/
/*jslint vars:true nomen:true*/
define(function () {
    'use strict';

    var ButtonDriver = function (className, $elem, $) {
        this.$ = $;
        this.$elem = $elem;
        this.className = className;
    };
    ButtonDriver.prototype = {
        click: function () {
            this.$('a.' + this.className, this.$elem).trigger('click');
        }
    };
    return ButtonDriver;
});