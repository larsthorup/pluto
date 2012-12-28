/*global module*/
module.exports = function (grunt) {
    'use strict';
    // var connect = require('connect');
    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json')
    };

    // convenience
    grunt.registerTask('default', ['lint', 'test']);

    grunt.registerTask('all', ['lint', 'test']); // clean coverage bundle test:ui
    grunt.registerTask('ci', ['lint', 'test']);


    /*
    // clean
    grunt.loadNpmTasks('grunt-clean');
    gruntConfig.clean = {
        folder: 'output'
    };
    */

    // lint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    gruntConfig.jshint = {
        options: { bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4,
            latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, plusplus: true, quotmark: true,
            regexp: true, undef: true, unused: true, strict: true, trailing: true
        },
        all: [
            'Gruntfile.js',
            'src/app/**/*.js',
            'src/test/**/*.js',
            '!src/test/libs/**/*.js'
        ]
    };
    grunt.registerTask('lint', 'jshint');


    // test
    grunt.loadNpmTasks('grunt-contrib-qunit');
    gruntConfig.qunit = {
        src: ['src/test/index.html']
        // serve: ['http://localhost:8082/test/index.html'],
        // ui: ['http://localhost:8083/test/uiTest.html']
    };
    grunt.registerTask('test', 'qunit:src'); // junit:env serve:test qunit:serve
    // grunt.loadNpmTasks('grunt-junit');


    /*
    // watch
    gruntConfig.watch = {
        scripts: {
            files: 'src/**'+'/*.*',
            tasks: 'lint test'
        }
    };


    // coverage
    grunt.loadNpmTasks('grunt-qunit-cov');
    gruntConfig['qunit-cov'] = {
        test:
        {
            minimum: 1.0,
            baseDir: 'src',
            srcDir: 'src/app',
            depDirs: ['src/libs', 'src/test'],
            outDir: 'output/coverage',
            testFiles: ['src/test/index.html']
        }
    };
    grunt.registerTask('coverage', 'qunit-cov');


    // bundle
    grunt.loadNpmTasks('grunt-requirejs');
    gruntConfig.requirejs = {
        name: 'main',
        dir: 'output/optimized',
        appDir: 'src',
        baseUrl: 'app',
        paths: {
            jquery: '../libs/jquery',
            underscore: '../libs/lodash',
            backbone: '../libs/backbone',
            tpl: '../libs/plugins/tpl'
        },
        shim: {
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        }
    };
    grunt.loadNpmTasks('grunt-contrib-copy');
    gruntConfig.copy = {
        bundle: {
            files: {
                'output/bundle/index.html': 'output/optimized/index.html',
                'output/bundle/app/css/index.css': 'output/optimized/app/css/index.css',
                'output/bundle/libs/require.js': 'output/optimized/libs/require.js',
                'output/bundle/app/config.js': 'output/optimized/app/config.js',
                'output/bundle/app/main.js': 'output/optimized/app/main.js'
            }
        }
    };
    grunt.registerTask('bundle', 'requirejs copy:bundle');


    // serve
    var serve = function (path, port) {
        // Note: using connect['static'], as jshint complains about connect.static, because static is a reserved word
        connect(connect['static'](path)).listen(port);
    };
    grunt.registerTask('serve:src', 'HTTP serve src on port 8080', function () {
        serve('src', 8080);
    });
    grunt.registerTask('serve:bundle', 'HTTP serve bundle on port 8081', function () {
        serve('output/bundle', 8081);
    });
    grunt.registerTask('serve:test', 'HTTP serve src on port 8082', function () {
        serve('src', 8082);
    });
    grunt.registerTask('serve:optimized', 'HTTP serve optimized on port 8082', function () {
        serve('output/optimized', 8083);
    });
    grunt.registerTask('wait', 'keep running until terminated', function () {
        // var done =
        this.async();
    });
    grunt.registerTask('test', 'junit:env serve:test qunit:serve');
    grunt.registerTask('test:ui', 'junit:env serve:optimized qunit:ui');

*/
    // grunt
    grunt.initConfig(gruntConfig);

};