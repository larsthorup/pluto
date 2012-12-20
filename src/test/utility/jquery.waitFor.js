/*global jQuery,window*/
(function ($) {
    'use strict';

    $.fn.waitFor = function (timeout) {
        // ToDo: default timeout if not set
        var dfd = $.Deferred();
        var selector = this.selector;
        var waitForDeferred = function (dfd, timeout) {
            var $elements = $(selector);
            if ($elements.length > 0) {
                dfd.resolve($elements);
            } else {
                var waitTime = 50;
                if (timeout < waitTime) {
                    dfd.reject();
                } else {
                    window.setTimeout(function () {
                        waitForDeferred(dfd, timeout - waitTime);
                    }, waitTime);
                }
            }
        };
        waitForDeferred(dfd, timeout);
        return dfd.promise();
    };
}(jQuery));
