/*global define*/
define(function (require) {
    'use strict';
    var TextFieldDriver = require('drivers/textField');
    var ButtonDriver = require('drivers/button');

    var LoginDriver = function ($elem, $) {
        this.$ = $;
        this.$elem = $elem;
        this.user = new TextFieldDriver('user', $elem, this.$);
        this.login = new ButtonDriver('login', $elem, this.$);
    };
    LoginDriver.prototype = {
    };
    return LoginDriver;
});