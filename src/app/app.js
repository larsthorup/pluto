/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var _ = require('underscore');

    var app = null;
    var getApp = function (dep) {
        if (!app) { // Note: singleton pattern
            app = new App(dep);
        }
        return app;
    };

    var App = function (dep) {
        this.templateRepo = dep.templateRepo;
        this.Trello = dep.Trello;
        this.Session = dep.Session;
        this.Card = dep.Card;
        this.CardCollection = dep.CardCollection;
        this.SessionView = dep.SessionView;
        this.CardView = dep.CardView;
        this.CardsView = dep.CardsView;
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

            this.trello = new this.Trello();
            this.session = new this.Session(null, {trello: this.trello});

            this.router.on('route:index', this.goCardsView, this);
            this.router.on('route:login', this.goLogin, this);
        },

        goCardsView: function () {
            var listId = '509070d37b1e65530d005067'; // ToDo: get from user
            var cards = new this.CardCollection(null, {
                listId: listId,
                dep: {
                    trello: this.trello,
                    Card: this.Card
                }
            });
            this.cards = cards;
            var cardsView = new this.CardsView({
                el: this.$main,
                collection: cards,
                dep: {
                    CardView: this.CardView,
                    templateRepo: this.templateRepo
                }
            });
            cardsView.render();
            this.view = cardsView;

            // ToDo: show "loading..."
            var fetchPromise = cards.fetch();
            // ToDo: turn off "loading..."
            fetchPromise.fail(_.bind(function () {
                // ToDo: show error
                // ToDo: DRY
                this.router.navigate('login', {trigger: true});
            }, this));
        },

        goLogin: function () {
            var sessionView = new this.SessionView({
                el: this.$main,
                dep: {
                    templateRepo: this.templateRepo,
                    app: this,
                    session: this.session
                }
            });
            sessionView.render();
            this.view = sessionView;
        }
    };

    return getApp;
});
