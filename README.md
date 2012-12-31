Pluto
=====

[![Build Status](https://travis-ci.org/larsthorup/pluto.png)](https://travis-ci.org/larsthorup/pluto)

Backbone sandbox

Prerequisites:

* install node.js

then

    npm install


From the browser
----------------

run all tests

    file://(path-to)/src/test/index.html

run app

    http://localhost:8080/


From the command line
---------------------

continuously lint and test on every save

    grunt watch

perform static analysis

    grunt lint

run all unit tests (results in output\testresults)

    grunt test

run all ui tests (results in output\testresults)

    grunt test:ui

produce unit test coverage statistics (in output\coverage\out\coverage.html)

    grunt coverage

serve source application (on http://localhost:8080)

    grunt connect:src wait

compress and minify (in output\bundle)

    grunt bundle

serve bundled application (on http://localhost:8081)

    grunt connect:bundle wait