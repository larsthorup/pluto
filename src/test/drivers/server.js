/*global define*/
define(function (require) {
    'use strict';
    var Trello = require('persistence/trello');

    var ServerDriver = function ($) {
        this.$ = $;
    };
    ServerDriver.prototype = {
        mock: function (config) {
            var trello = new Trello();
            var list = config.lists[0];
            var listId = list.id;
            var mockUrl = trello.url + '/lists/' + listId;
            this.$.mockjax({
                log: null,
                url: mockUrl,
                data: {
                    key: trello.appKey,
                    token: config.user,
                    cards: 'open'
                },
                responseTime: 1,
                responseText: {
                    cards: list.openCards
                }
            });

        }
    };
    return ServerDriver;
});