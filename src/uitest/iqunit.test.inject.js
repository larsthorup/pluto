/*global jQuery*/
(function ($) {
    'use strict';

    $.fn.injected = function () {
        return 'injected!';
    };
}(jQuery));
