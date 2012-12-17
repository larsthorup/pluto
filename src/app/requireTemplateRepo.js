/*global define*/
define(function (require) {
    'use strict';
    var _ = require('underscore');

    var TemplateRepo = function () {

    };
    TemplateRepo.prototype = {
        get: function (id) {
            if (id === 'session-template') {
                return _.template('<div><input class="user"/><a class="login">Sign In</a></div>');
            } else {
                throw new Error('assertion: template with id "' + id + '" not found');
            }
        }
    };

    return TemplateRepo;
});