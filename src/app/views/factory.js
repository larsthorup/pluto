/*global define*/
define(function () {
    'use strict';

    var ViewFactoryFactory = {
        create: function (View) {
            var ViewFactory = {
                create: function (options) {
                    return new View(options);
                },
                mockWith: function (spy) {
                    ViewFactory.mock = {
                        render: spy()
                    };
                    ViewFactory._create = ViewFactory.create;
                    ViewFactory.create = function () {
                        return ViewFactory.mock;
                    };
                },
                restore: function () {
                    ViewFactory.create = ViewFactory._create;
                }
            };
            return ViewFactory;
        }
    };
    return ViewFactoryFactory;
});