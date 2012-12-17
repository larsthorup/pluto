/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var TemplateRepo = require('templateRepo');
    var Trello = require('persistence/trello');
    var Session = require('models/session');
    var CardCollectionFactory = require('collections/cards');
    var SessionViewFactory = require('views/session');
    var CardView = require('views/card');
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
            this.templateRepo = new TemplateRepo(this.document);
            this.$main = $('#main', this.document);

            this.trello = new Trello(Backbone);
            this.session = new Session(null, {trello: this.trello});

            this.router.on('route:index', this.goCardsView, this);
            this.router.on('route:login', this.goLogin, this);
        },

        goCardsView: function () {
            var listId = '509070d37b1e65530d005067'; // ToDo: get from user
            var cards = CardCollectionFactory.create(null, {listId: listId, trello: this.trello});
            this.cards = cards;
            var cardsView = CardsViewFactory.create({
                document: this.document,
                el: this.$main,
                collection: cards,
                dep: {
                    CardView: CardView,
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
