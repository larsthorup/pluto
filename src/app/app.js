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

            this.router.on('route:index', this.goCardsView, this);
            this.router.on('route:login', this.goLogin, this);
        },

        goCardsView: function () {
            var cards = new CardCollection();
            var cardsView = CardsViewFactory.create({
                document: this.document,
                el: this.$main,
                collection: cards
            });
            cardsView.render();
            this.view = cardsView;

            // ToDo: load data from server
            cards.add([
                new Card({id: 11, title: 'Meet Rob'}),
                new Card({id: 12, title: 'Buy lunch'})
            ]);
        },

        goLogin: function () {
            var session = new Session();
            var sessionView = SessionViewFactory.create({
                app: this,
                document: this.document,
                el: this.$main,
                model: session
            });
            sessionView.render();
            this.view = sessionView;
        }
    };

    return getApp;
});
