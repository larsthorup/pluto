/*global define*/
define(function (require) {
    'use strict';
    var Backbone = require('backbone');

    var Card = Backbone.Model.extend({

        defaults: {
            title: ''
        },

        duplicate: function () {
            var title = this.get('title');
            this.set('title', title + title);
        }
    });
    return Card;
});
