/*global define*/
define(function () {
    'use strict';

    var ViewFactoryFactory = {
        create: function (View) {
            var ViewFactory = {
                create: function (options) {
                    return new View(options);
                },
                /**
                 * mock the create() method of the factory. use restore() to revert
                 * @param spy function that will create a spy, typically sinon.spy
                 * @param @optional fakes dictionary of fake implementations of view methods
                 */
                mockWith: function (spy, fakes) {
                    fakes = fakes || {};
                    ViewFactory.mock = {
                        render: spy(fakes.render || function () {})
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