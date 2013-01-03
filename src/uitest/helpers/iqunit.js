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

                    // Note: make the page visible if requested
                    var $fixture = q$('#qunit-fixture');
                    if(IQUnit.config.visible) {
                        $fixture.css({left: 'inherit', top: 'inherit'}); // Note: instead of the usual (-10000, -10000)
                    }

                    // Note: first we load the referenced page into an iframe in QUnit's HTML fixture so we can interact with it
                    $fixture.html('<iframe id="iqUnit-appUnderTest" src="' + pageUrl + '"></iframe>');
                    var $appUnderTest = q$('#iqUnit-appUnderTest');
                    // ToDo: error handling
                    $appUnderTest.load(function () {

                        // Note: using the local jQuery object we can inject scripts into the local page where they will connect to the local jQuery object
                        IQUnit.config.getJQueryUnderTest($appUnderTest[0].contentWindow, function (a$) {
                            // ToDo: load scripts without using jQuery to have one less dependency
                            var scriptListLoading = a$.map(IQUnit.config.injectScripts, a$.getScript);
                            var allScriptsLoading = a$.when.apply(null, scriptListLoading);
                            // ToDo: error handling
                            allScriptsLoading.done(function () {
                                self.$ = a$;
                                if (testEnvironment && testEnvironment.setup) {
                                    testEnvironment.setup.apply(self);
                                }
                                QUnit.start();
                            });
                        });
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