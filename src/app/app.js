/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Session = require('models/session');
    var Card = require('models/card');
    var CardCollection = require('collections/cards');
    var SessionViewFactory = require('views/session');
    var CardsViewFactory = require('views/cards');

    var app = null;
    var getApp = function () {
        if (!app) { // Note: singleton pattern
            app = new App();
        }
        return app;
    };

    var App = function () {
        this.root = '/';
    };
    App.prototype = {
        destroy: function () { // Note: singleton pattern, this part included for testability
            app = null;
        },

        bootstrap: function (document, router) {
            this.document = document;
            this.router = router;

            this.$main = $('#main', this.document);

            this.applicationKey = '4c5b4d16e6e53d893674f9452ac277bf';
            this.session = new Session();
            this.cards = new CardCollection();

            this.router.on('route:index', this.goCardsView, this);
            this.router.on('route:login', this.goLogin, this);
        },

        goCardsView: function () {
            var cardsView = CardsViewFactory.create({
                document: this.document,
                el: this.$main,
                collection: this.cards
            });
            cardsView.render();
            this.view = cardsView;

            // ToDo: refactor to use sync()
            var trelloApiVersion = 1;
            var listId = '509070d37b1e65530d005067'; // ToDo: get from user
            var url = 'https://api.trello.com/' + trelloApiVersion + '/lists/' + listId;
            var data = {
                key: this.applicationKey,
                token: this.session.get('userId'),
                cards: 'open'
            };
            // ToDo: handle error
            // ToDo: show "loading..."
            $.ajax(url, { data: data, dataType: 'json', success: $.proxy(function (list) {
                // ToDo: use underscore
                var cardList = [];
                for (var i = 0; i < list.cards.length; i += 1) {
                    var card = list.cards[i];
                    cardList.push(new Card({id: card.id, title: card.name}));
                }
                this.cards.add(cardList);
            }, this)});
        },

        goLogin: function () {
            var sessionView = SessionViewFactory.create({
                app: this,
                document: this.document,
                el: this.$main,
                model: this.session
            });
            sessionView.render();
            this.view = sessionView;
        }
    };

    return getApp;
});
