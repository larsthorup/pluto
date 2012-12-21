/*global define*/
define(function (require) {
    'use strict';
    var TextFieldDriver = require('drivers/textField');

    var LoginDriver = function ($elem, $) {
        this.$ = $;
        this.$elem = $elem;
        this.user = new TextFieldDriver('user', $elem, this.$);
    };
    LoginDriver.prototype = {
    };
    return LoginDriver;
});