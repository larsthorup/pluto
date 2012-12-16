/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var _ = require('underscore');

    var TemplateRepo = function (document) {
        this.document = document;
    };
    TemplateRepo.prototype = {
        get: function (id) {
            var html = $('#' + id + '', this.document).html();
            if (!html) {
                throw new Error('assertion: template with id "' + id + '" not found');
            }
            return _.template(html);
        }
    };

    return TemplateRepo;
});