/*global define,QUnit,window*/
define(function (require) {
    'use strict';
    var q$ = require('jquery');

    // Note: Interactive QUnit
    var IQUnit = {
        asyncTest: function (testName/*, expected*/, pageUrl, callback) {
            return QUnit.asyncTest(testName/*, expected*/, function () {
                // Note: first we load the referenced page into an iframe in QUnit's HTML fixture so we can interact with it
                q$('#qunit-fixture').html('<iframe id="appUnderTest" src="' + pageUrl + '"></iframe>');
                var $appUnderTest = q$('#appUnderTest');
                $appUnderTest.load(function () {
                    // Note: we can get a reference to the local page's require object as soon as the iframe is loaded
                    var windowUnderTest = $appUnderTest[0].contentWindow;
                    var require = windowUnderTest.require;
                    // Note: we know that all dependent modules have been loaded when the outermost dependency, app/main.js, has been loaded
                    require.onResourceLoad = function (context, map/*, depArray*/) {
                        if (map.url === 'app/main.js') {
                            // Note: so then we can get a reference to the jQuery object on the local page
                            var $ = require('jquery');

                            (function ($) {
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
                            }($));

                            // Note: using the jQuery object we can load mockjax into the local page where it will plugin to the local jQuery object
                            $.getScript('/test/libs/jquery.mockjax.js', function () {
                                callback(require, $);
                            });
                        }
                    };
                });
            });
        }
    };
    return IQUnit;
});