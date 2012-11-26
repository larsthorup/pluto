/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Session = require('models/session');
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

            this.session = new Session();

            this.router.on('route:index', this.goCardsView, this);
            this.router.on('route:login', this.goLogin, this);
        },

        goCardsView: function () {
            var listId = '509070d37b1e65530d005067'; // ToDo: get from user
            var cards = new CardCollection(null, {listId: listId});
            this.cards = cards;
            var cardsView = CardsViewFactory.create({
                document: this.document,
                el: this.$main,
                collection: cards
            });
            cardsView.render();
            this.view = cardsView;

            // ToDo: show "loading..."
            // ToDo: show error
            cards.fetch();
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
