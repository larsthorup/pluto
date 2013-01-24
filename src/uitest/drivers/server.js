/*global define*/
/*jslint vars:true nomen:true*/
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
            if (list.status) {
                mockjaxOptions.status = list.status;
            }
            if (list.openCards) {
                mockjaxOptions.responseText = {
                    cards: list.openCards
                };
            }
            this.mockjaxId = this.$.mockjax(mockjaxOptions);
        },
        mockClear: function () {
            this.$.mockjaxClear(this.mockjaxId);
        }
    };
    return ServerDriver;
});