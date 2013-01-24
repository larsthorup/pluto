/*global define*/
/*jslint vars:true*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    var Card = Backbone.Model.extend({

        defaults: {
            title: ''
        },

        parse: function (response) {
            return {
                id: response.id,
                title: response.name
            };
        },

        duplicate: function () {
            var title = this.get('title');
            this.set('title', title + title);
        }
    });
    return Card;
});
