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
        module: function (name, pageUrl, testEnvironment) {
            QUnit.module(name, {
                setup: function () {
                    QUnit.stop();
                    var self = this;
                    self.testTimeoutBefore = QUnit.config.testTimeout;
                    QUnit.config.testTimeout = IQUnit.config.testTimeout;

                    // Note: first we load the referenced page into an iframe in QUnit's HTML fixture so we can interact with it
                    q$('#qunit-fixture').html('<iframe id="iqUnit-appUnderTest" src="' + pageUrl + '"></iframe>');
                    var $appUnderTest = q$('#iqUnit-appUnderTest');
                    // ToDo: error handling
                    $appUnderTest.load(function () {

                        // Note: we can get a reference to the local page's require object as soon as the iframe is loaded
                        var windowUnderTest = $appUnderTest[0].contentWindow;
                        var require = windowUnderTest.require;

                        // Note: we know that all dependent modules have been loaded when the outermost dependency, app/main.js, has been loaded
                        // ToDo: error handling
                        require.onResourceLoad = function (context, map/*, depArray*/) {
                            if (map.url === IQUnit.config.mainJsUrl) {

                                // Note: so then we can get a reference to the jQuery object on the local page
                                var $ = require('jquery');

                                // Note: using the local jQuery object we can inject scripts into the local page where they will connect to the local jQuery object
                                var scriptListLoading = $.map(IQUnit.config.injectScripts, $.getScript);
                                var allScriptsLoading = $.when.apply(null, scriptListLoading);
                                // ToDo: error handling
                                allScriptsLoading.done(function () {
                                    self.app = new IQUnit.config.driver($);
                                    if (testEnvironment && testEnvironment.setup) {
                                        testEnvironment.setup.apply(self);
                                    }
                                    QUnit.start();
                                });
                            }
                        };
                    });
                },
                teardown: function () {
                    var self = this;
                    if (testEnvironment && testEnvironment.teardown) {
                        testEnvironment.teardown.apply(self);
                    }
                    QUnit.config.testTimeout = self.testTimeoutBefore;
                }
            });
        }
    };
    return IQUnit;
});