/*global define*/
define(function () {
    'use strict';

    var ViewFactoryFactory = {
        create: function (View) {
            var Factory = {
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
                    Factory.mock = {
                        render: spy(fakes.render || function () {})
                    };
                    Factory._create = Factory.create;
                    Factory.create = function () {
                        return Factory.mock;
                    };
                },
                restore: function () {
                    Factory.create = Factory._create;
                }
            };
            return Factory;
        }
    };
    return ViewFactoryFactory;
});