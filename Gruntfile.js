/*global module*/
/*jshint camelcase:false*/ // because of gruntConfig.qunit_junit
module.exports = function (grunt) {
    'use strict';
    // var connect = require('connect');
    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json')
    };

    // convenience
    grunt.registerTask('default', ['lint', 'test']);

    grunt.registerTask('all', ['clean', 'lint', 'test', 'bundle']); // coverage test:ui
    grunt.registerTask('ci', ['lint', 'test']);


    // clean
    grunt.loadNpmTasks('grunt-contrib-clean');
    gruntConfig.clean = {};
    gruntConfig.clean.output = ['output'];


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
    gruntConfig.qunit = {};
    gruntConfig.qunit.src = ['src/test/index.html'];
    gruntConfig.qunit.serve = ['http://localhost:8082/test/index.html'];
        // ui: ['http://localhost:8083/test/uiTest.html']
    grunt.loadNpmTasks('grunt-qunit-junit');
    gruntConfig.qunit_junit = {
        options: {
            dest: 'output/testresults'
        }
    };


    // watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    gruntConfig.watch = {
        scripts: {
            files: ['src/**/*.*'],
            tasks: ['lint', 'test']
        }
    };


    // serve
    grunt.registerTask('wait', 'keep running until terminated', function () {
        /* var done =*/
        this.async();
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    gruntConfig.connect = {};
    gruntConfig.connect.src = {
        options: {
            port: 8080,
            base: 'src'
        }
    };
    gruntConfig.connect.test = {
        options: {
            port: 8082,
            base: 'src'
        }
    };
    grunt.registerTask('test', ['qunit_junit', 'connect:test', 'qunit:serve']);


    /*
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
    */


    // bundle
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    gruntConfig.requirejs = {
        bundle: {
            options: {
                name: 'main',
                appDir: 'src',
                baseUrl: 'app',
                mainConfigFile: 'src/app/config.js',
                dir: 'output/optimized'
            }
        }
    };
    grunt.registerTask('bundle', 'requirejs'); // copy:bundle
    /*
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
    grunt.registerTask('serve:bundle', 'HTTP serve bundle on port 8081', function () {
        serve('output/bundle', 8081);
    });
    grunt.registerTask('serve:optimized', 'HTTP serve optimized on port 8083', function () {
        serve('output/optimized', 8083);
    });
    grunt.registerTask('test:ui', 'junit:env serve:optimized qunit:ui');
    */

    // grunt
    grunt.initConfig(gruntConfig);

};