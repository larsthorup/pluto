/*global define*/
define(function () {
    'use strict';

    var CollectionFactoryFactory = {
        create: function (Collection) {
            var Factory = {
                create: function (models, options) {
                    return new Collection(models, options);
                },
                /**
                 * mock the create() method of the factory. use restore() to revert
                 * @param spy function that will create a spy, typically sinon.spy
                 * @param @optional fakes dictionary of fake implementations of view methods
                 */
                mockWith: function (spy, fakes) {
                    fakes = fakes || {};
                    // ToDo: make generic over available methods to facilitate sharing common implementation
                    Factory.mock = {
                        fetch: spy(fakes.fetch || function () {})
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
    return CollectionFactoryFactory;
});