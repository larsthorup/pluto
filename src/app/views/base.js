/*global define*/
define(function (require) {
    'use strict';

    var $ = require('jquery');
    var _ = require('lodash');
    var Backbone = require('backbone');

    var BaseView = Backbone.View.extend({

        makeTemplate: function (id) {
            var html = $('#' + id + '', this.document).html();
            if (!html) {
                throw new Error('assertion: template with id "' + id + '" not found');
            }
            return _.template(html);
        }

    });

    return BaseView;
});