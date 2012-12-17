/*global define*/
define(function (require) {
    'use strict';
    var sessionTemplate = require('tpl!views/session.html');

    var TemplateRepo = function () {
        this.template = {
            'session-template': sessionTemplate
        };
    };
    TemplateRepo.prototype = {
        get: function (id) {
            if (id in this.template) {
                return this.template[id];
            }
            throw new Error('assertion: template with id "' + id + '" not found');
        }
    };

    return TemplateRepo;
});