/*global define,window,QUnit*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';
    var q$ = require('jquery');

    // Note: Interactive QUnit
    var IQUnit = {
        module: function (name, config, testEnvironment) {
            QUnit.module(name, {
                setup: function () {
                    QUnit.stop();
                    var self = this;

                    // Note: make the page visible if requested
                    var $fixture = q$('#qunit-fixture');
                    var iframePosition = config.visible ? 'inherit' : '-10000px'; // Note: -10000px is from qunit.css
                    $fixture.css({left: iframePosition, top: iframePosition});

                    // Note: first we load the referenced page into an iframe in QUnit's HTML fixture so we can interact with it
                    $fixture.html('<iframe id="iqUnit-appUnderTest" src="' + config.url + '"></iframe>');
                    var $appUnderTest = q$('#iqUnit-appUnderTest');

                    // Note: error handling for iframe loading
                    var appUnderTestLoaded = false;
                    window.setTimeout(function () {
                        if (!appUnderTestLoaded && config.error) {
                            config.error('Failed to load "' + config.url + '"');
                        }
                    }, QUnit.config.testTimeout / 2);
                    function iframeLoadedSuccessfully(iframeWindow) {
                        var iframeHtml = iframeWindow.document.documentElement.outerHTML;
                        var phantomJsIframeLoadFailed = iframeHtml.indexOf('Cannot GET ') > 0 && iframeHtml.indexOf(config.url) > 0;
                        return !phantomJsIframeLoadFailed;
                    }

                    $appUnderTest.load(function onAppUnderTestLoaded() {
                        var iframeWindow = $appUnderTest[0].contentWindow;
                        if (iframeLoadedSuccessfully(iframeWindow)) {
                            appUnderTestLoaded = true;

                            // Note: using the local jQuery object we can inject scripts into the local page where they will connect to the local jQuery object
                            config.getJQueryUnderTest(iframeWindow, function (a$) {
                                // ToDo: load scripts without using jQuery to have one less dependency, then getJQueryUnderTest can be a pure setup thing not in IQUnit
                                var scriptListLoading = a$.map(config.injectScripts, a$.getScript);
                                var allScriptsLoading = a$.when.apply(null, scriptListLoading);

                                // Note: error handling for script injection
                                allScriptsLoading.fail(function onScriptsLoadingFailed() {
                                    if (config.error) {
                                        config.error('Failed to load "' + config.injectScripts + '"');
                                    }
                                });

                                allScriptsLoading.done(function onAllScriptsLoaded() {
                                    self.$ = a$;
                                    if (testEnvironment && testEnvironment.setup) {
                                        testEnvironment.setup.apply(self);
                                    }
                                    QUnit.start();
                                });
                            });
                        }
                    });
                },
                teardown: function () {
                    if (testEnvironment && testEnvironment.teardown) {
                        testEnvironment.teardown.apply(this);
                    }
                }
            });
        }
    };
    return IQUnit;
});