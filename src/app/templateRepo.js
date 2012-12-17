/*global define*/
define(function (require) {
    'use strict';
    var session = require('tpl!views/session.html');
    var card = require('tpl!views/card.html');
    var cards = require('tpl!views/cards.html');
    var cardsItem = require('tpl!views/cardsItem.html');

    var TemplateRepo = function () {
        this.template = {
            'session': session,
            'card': card,
            'cards': cards,
            'cardsItem': cardsItem
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