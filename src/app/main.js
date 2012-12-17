/*global define, document*/
// ToDo: consider using domReady require.js plugin to inject document object
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Router = require('router');
    var TemplateRepo = require('templateRepo');
    var getApp = require('app');
    var Trello = require('persistence/trello');
    var Session = require('models/session');
    var CardCollectionFactory = require('collections/cards');
    var SessionViewFactory = require('views/session');
    var CardView = require('views/card');
    var CardsViewFactory = require('views/cards');

    var router = new Router();
    var templateRepo = new TemplateRepo();
    var app = getApp({
        templateRepo: templateRepo,
        Trello: Trello,
        Session: Session,
        CardCollectionFactory: CardCollectionFactory,
        SessionViewFactory: SessionViewFactory,
        CardView: CardView,
        CardsViewFactory: CardsViewFactory
    });
    app.bootstrap(document, router);

    // ToDo: make event tracing work
//    var traceEvents = true;
//    if (traceEvents) {
//        var originalTrigger = Backbone.Events.trigger;
//        Backbone.Events.trigger = function () {
//            window.console.log(arguments);
//            originalTrigger.apply(this, Array.prototype.slice.call(arguments));
//        };
//    }

    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in app.js.
    Backbone.history.start({ pushState: false, root: app.root });

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on('click', 'a[href]:not([data-bypass])', function (evt) {
        // Get the absolute anchor href.
        var href = { prop: $(this).prop('href'), attr: $(this).attr('href') };
        // Get the absolute root.
        var root = document.location.protocol + '//' + document.location.host + app.root;

        // Ensure the root is part of the anchor href, meaning it's relative.
        if (href.prop.slice(0, root.length) === root) {
            // Stop the default event to ensure the link will not cause a page
            // refresh.
            evt.preventDefault();

            // `Backbone.history.navigate` is sufficient for all Routers and will
            // trigger the correct events. The Router's internal `navigate` method
            // calls this anyways.  The fragment is sliced from the root.
            Backbone.history.navigate(href.attr, true);
        }
    });
});
