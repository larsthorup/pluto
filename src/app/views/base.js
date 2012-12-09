/*global define*/
/**
 * @module views/base
 */
define(function (require) {
    'use strict';

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    /**
     * Common functionality for all views
     * @class
     */
    var BaseView = Backbone.View.extend({

        /**
         * create an Underscore template object from the source in this.document
         * @param id element id of the script tag containing the template
         * @return {*}
         */
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