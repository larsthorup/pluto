/*global module, require*/
module.exports = function (grunt) {
    'use strict';
    var connect = require('connect');


    // convenience
    grunt.registerTask('default', 'lint test');
    grunt.registerTask('all', 'clean lint test coverage bundle');
    grunt.registerTask('ci', 'lint');


    // clean
    grunt.loadNpmTasks('grunt-clean');
    var cleanConfig = {
        folder: 'output'
    };


    // lint
    var lintConfig = {
        all: [
            'Gruntfile.js',
            'src/app/**/*.js',
            'src/test/*.js',
            'src/test/tests/**/*.js'
        ]
    };
    var jsHintOptions = {
        options: { bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4,
            latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, plusplus: true, quotmark: true,
            regexp: true, undef: true, unused: true, strict: true, trailing: true
        }
    };


    // test
    var qunitConfig = {
        src: ['src/test/index.html'],
        bundle: ['output/bundle/test/index.html']
    };
    grunt.loadNpmTasks('grunt-junit');
    grunt.registerTask('test', 'junit:env qunit:src');


    // watch
    var watchConfig = {
        scripts: {
            files: 'src/**/*.*',
            tasks: 'lint test'
        }
    };


    // coverage
    grunt.loadNpmTasks('grunt-qunit-cov');
    var coverageConfig = {
        test:
        {
            minimum: 1.0,
            baseDir: 'src',
            srcDir: 'src/app',
            depDirs: ['src/assets', 'src/test'],
            outDir: 'output/coverage',
            testFiles: ['src/test/index.html']
        }
    };
    grunt.registerTask('coverage', 'qunit-cov');


    // bundle
    grunt.loadNpmTasks('grunt-requirejs');
    var requirejsConfig = {
        name: 'main',
        dir: 'output/optimized',
        appDir: 'src',
        baseUrl: 'app',
        paths: {
            jquery: '../assets/js/libs/jquery',
            underscore: '../assets/js/libs/lodash',
            backbone: '../assets/js/libs/backbone'
        },
        shim: {
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        }
    };
    grunt.loadNpmTasks('grunt-contrib-copy');
    var copyConfig = {
        bundle: {
            files: {
                'output/bundle/index.html': 'output/optimized/index.html',
                'output/bundle/assets/css/index.css': 'output/optimized/assets/css/index.css',
                'output/bundle/assets/js/libs/require.js': 'output/optimized/assets/js/libs/require.js',
                'output/bundle/app/config.js': 'output/optimized/app/config.js',
                'output/bundle/app/main.js': 'output/optimized/app/main.js'
            }
        }
    };
    grunt.registerTask('bundle', 'requirejs copy:bundle');
    // ToDo: grunt.registerTask('test:bundle', 'qunit:bundle');


    // serve
    var serve = function (path, port) {
        // Note: using connect['static'], as jshint complains about connect.static, because static is a reserved word
        connect(connect['static'](path)).listen(port);
    };
    grunt.registerTask('serve:src', 'HTTP serve src on port 8080', function () { serve('src', 8080); });
    grunt.registerTask('serve:bundle', 'HTTP serve bundle on port 8081', function () { serve('output/bundle', 8081); });


    // grunt
    grunt.initConfig({
        clean: cleanConfig,
        lint: lintConfig,
        jshint: jsHintOptions,
        qunit: qunitConfig,
        watch: watchConfig,
        'qunit-cov': coverageConfig,
        requirejs: requirejsConfig,
        copy: copyConfig
    });

};