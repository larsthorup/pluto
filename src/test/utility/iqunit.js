/*global define,QUnit,window*/
define(function (require) {
    'use strict';
    var q$ = require('jquery');

    // Note: Interactive QUnit
    var IQUnit = {
        asyncTest: function (testName/*, expected*/, pageUrl, callback) {

            // Note: IQUnit.asyncTest is just a more fancy version of QUnit.asyncTest
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

                            // Note: using the jQuery object we can load mockjax and waitFor into the local page where it will plugin to the local jQuery object
                            var dfd1 = $.getScript('/test/libs/jquery.mockjax.js');
                            var dfd2 = $.getScript('/test/utility/jquery.waitFor.js');
                            var dfd = $.when(dfd1, dfd2);
                            dfd.done(function () {
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