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

run all tests

    grunt test

produce test coverage statistics (in output\coverage\out\coverage.html)

    grunt coverage

serve source application

    grunt serve:src watch

serve bundled application

    grunt serve:bundle watch