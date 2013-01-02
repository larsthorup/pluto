/*global define,QUnit*/
define(function (require) {
    'use strict';
    var q$ = require('jquery');

    // Note: Interactive QUnit
    var IQUnit = {
        config: {
            // Note: default values
            testTimeout: 2000
        },
        module: function (name, testEnvironment) {
            QUnit.module(name, {
                setup: function () {
                    this.testTimeoutBefore = QUnit.config.testTimeout;
                    QUnit.config.testTimeout = IQUnit.config.testTimeout;
                    if (testEnvironment && testEnvironment.setup) {
                        testEnvironment.setup.apply(this);
                    }
                },
                teardown: function () {
                    if (testEnvironment && testEnvironment.teardown) {
                        testEnvironment.teardown.apply(this);
                    }
                    QUnit.config.testTimeout = this.testTimeoutBefore;
                }
            });
        },
        // ToDo: refactor all this setup to IQUnit.setup so app is available for the setup code (e.g. setting up mock server response)
        asyncTest: function (testName/*, expected*/, pageUrl, callback) {

            // Note: IQUnit.asyncTest is just a more fancy version of QUnit.asyncTest
            return QUnit.asyncTest(testName/*, expected*/, function () {

                // Note: first we load the referenced page into an iframe in QUnit's HTML fixture so we can interact with it
                q$('#qunit-fixture').html('<iframe id="iqUnit-appUnderTest" src="' + pageUrl + '"></iframe>');
                var $appUnderTest = q$('#iqUnit-appUnderTest');
                $appUnderTest.load(function () {

                    // Note: we can get a reference to the local page's require object as soon as the iframe is loaded
                    var windowUnderTest = $appUnderTest[0].contentWindow;
                    var require = windowUnderTest.require;

                    // Note: we know that all dependent modules have been loaded when the outermost dependency, app/main.js, has been loaded
                    require.onResourceLoad = function (context, map/*, depArray*/) {
                        if (map.url === IQUnit.config.mainJsUrl) {

                            // Note: so then we can get a reference to the jQuery object on the local page
                            var $ = require('jquery');

                            // Note: using the local jQuery object we can inject scripts into the local page where they will connect to the local jQuery object
                            var scriptListLoading = $.map(IQUnit.config.injectScripts, $.getScript);
                            var allScriptsLoading = $.when.apply(null, scriptListLoading);
                            allScriptsLoading.done(function () {
                                var app = new IQUnit.config.driver($);
                                callback(require, $, app);
                            });
                        }
                    };
                });
            });
        }
    };
    return IQUnit;
});