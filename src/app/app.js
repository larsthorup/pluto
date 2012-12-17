/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

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
        this.CardCollectionFactory = dep.CardCollectionFactory;
        this.SessionView = dep.SessionView;
        this.CardView = dep.CardView;
        this.CardsViewFactory = dep.CardsViewFactory;
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

            this.trello = new this.Trello(Backbone);
            this.session = new this.Session(null, {trello: this.trello});

            this.router.on('route:index', this.goCardsView, this);
            this.router.on('route:login', this.goLogin, this);
        },

        goCardsView: function () {
            var listId = '509070d37b1e65530d005067'; // ToDo: get from user
            var cards = this.CardCollectionFactory.create(null, {listId: listId, trello: this.trello});
            this.cards = cards;
            var cardsView = this.CardsViewFactory.create({
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
                app: this,
                el: this.$main,
                model: this.session,
                dep: {
                    templateRepo: this.templateRepo
                }
            });
            sessionView.render();
            this.view = sessionView;
        }
    };

    return getApp;
});
