/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var _ = require('underscore');

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
            this.cards = new this.CardCollection(null, {
                listId: listId,
                dep: {
                    trello: this.trello,
                    Card: this.Card
                }
            });
            this.view = new this.CardsView({
                el: this.$main,
                dep: {
                    CardView: this.CardView,
                    templateRepo: this.templateRepo,
                    cards: this.cards
                }
            });
            this.view.render();

            // ToDo: show "loading..."
            var fetchPromise = this.cards.fetch();
            // ToDo: turn off "loading..."
            fetchPromise.fail(_.bind(function onFecthFailed() {
                // ToDo: show error
                // ToDo: DRY
                this.router.navigate('login', {trigger: true});
            }, this));
        },

        goLogin: function () {
            this.view = new this.SessionView({
                el: this.$main,
                dep: {
                    templateRepo: this.templateRepo,
                    app: this,
                    session: this.session
                }
            });
            this.view.render();
        }
    };

    return App;
});
