/*global define*/
define(function (require) {
    'use strict';
    var _ = require('underscore');

    var TemplateRepoStub = function (templates) {
        this.templates = templates;
    };
    TemplateRepoStub.prototype = {
        get: function (id) {
            return _.template(this.templates[id]);
        }
    };

    return TemplateRepoStub;
});