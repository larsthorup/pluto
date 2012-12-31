/*global define,QUnit,window*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    require('waitFor');

    QUnit.module('jquery.waitFor');

    QUnit.asyncTest('found while waiting', function () {
        // when
        var dfd = $('#target').waitFor();
        window.setTimeout(function () {
            $('#qunit-fixture').html('<div id="target">apples</div>');
        }, 10);

        // then
        dfd.done(function ($elem) {
            QUnit.equal($elem.text(), 'apples', '$elem.text()');
            QUnit.start();
        });
        dfd.fail(function () { QUnit.ok(false, 'unexpected fail'); });
    });

    QUnit.asyncTest('found immediately', function () {
        // when
        $('#qunit-fixture').html('<div id="target">oranges</div>');
        var dfd = $('#target').waitFor();

        // then
        dfd.done(function ($elem) {
            QUnit.equal($elem.text(), 'oranges', '$elem.text()');
            QUnit.start();
        });
        dfd.fail(function () { QUnit.ok(false, 'unexpected fail'); });
    });

    QUnit.asyncTest('timeout before found', function () {
        // when
        var dfd = $('#target').waitFor();
        window.setTimeout(function () {
            $('#qunit-fixture').html('<div id="target">bananas</div>');
        }, 200);

        // then
        dfd.done(function (/*$elem*/) { QUnit.ok(false, 'unexpected done'); });
        dfd.fail(function () {
            QUnit.ok(true, 'fail');

            // Note: prevent disturbing the next test by waiting until the bananas #target have been inserted
            window.setTimeout(function () {
                QUnit.start();
            }, 200);
        });
    });

    QUnit.asyncTest('custom timeout', function () {
        // when
        var dfd = $('#target').waitFor(300);
        window.setTimeout(function () {
            $('#qunit-fixture').html('<div id="target">grapes</div>');
        }, 200);

        // then
        dfd.done(function ($elem) {
            QUnit.equal($elem.text(), 'grapes', '$elem.text()');
            QUnit.start();
        });
        dfd.fail(function () { QUnit.ok(false, 'unexpected fail'); });
    });

});