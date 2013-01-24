/*global define*/
/*jslint vars:true nomen:true*/
define(function (require) {
    'use strict';
    var _ = require('underscore');

    var TemplateRepoStub = function (templates) {
        for (var key in templates) {
            if (templates.hasOwnProperty(key)) {
                this[key] = _.template(templates[key]);
            }
        }
    };
    return TemplateRepoStub;
});