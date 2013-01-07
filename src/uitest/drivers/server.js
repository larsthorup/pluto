/*global define*/
define(function (require) {
    'use strict';
    var Trello = require('persistence/trello');

    var ServerDriver = function ($) {
        this.$ = $;
    };
    ServerDriver.prototype = {
        mock: function (options) {
            var trello = new Trello();
            var list = options.lists[0];
            var listId = list.id;
            var mockUrl = trello.url + '/lists/' + listId;
            var mockjaxOptions = {
                log: null,
                url: mockUrl,
                data: {
                    key: trello.appKey,
                    token: options.user,
                    cards: 'open'
                },
                responseTime: 1
            };
            if(list.status) {
                mockjaxOptions.status = list.status;
            }
            if(list.openCards) {
                mockjaxOptions.responseText = {
                    cards: list.openCards
                };
            }
            this.$.mockjax(mockjaxOptions);

        }
    };
    return ServerDriver;
});