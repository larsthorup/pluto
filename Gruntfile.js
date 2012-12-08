/*global module, require*/
module.exports = function (grunt) {
    'use strict';
    var connect = require('connect');

    // Project configuration.
    grunt.initConfig({
        requirejs: {
            name: 'main',
            dir: 'output/bundle',
            appDir: 'src',
            baseUrl: 'app',
            paths: {
                jquery: '../assets/js/libs/jquery',
                lodash: '../assets/js/libs/lodash',
                backbone: '../assets/js/libs/backbone'
            }
        },
        'qunit-cov': {
            test:
            {
                minimum: 1.0,
                baseDir: 'src',
                srcDir: 'src/app',
                depDirs: ['src/assets', 'src/test'],
                outDir: 'output/coverage',
                testFiles: ['src/test/index.html']
            }
        },
        watch: {
            scripts: {
                files: 'src/**/*.*',
                tasks: 'lint coverage'
            }
        },
        qunit: {
            src: ['src/test/index.html'],
            bundle: ['output/bundle/test/index.html']
        },
        lint: {
            all: [
                'Gruntfile.js',
                'src/app/**/*.js',
                'src/test/*.js',
                'src/test/tests/**/*.js'
            ]
        },
        jshint: {
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                plusplus: true,
                quotmark: true,
                regexp: true,
                undef: true,
                unused: true,
                strict: true,
                trailing: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-junit');
    grunt.loadNpmTasks('grunt-qunit-cov');
    grunt.loadNpmTasks('grunt-requirejs');

    // default and alias tasks
    grunt.registerTask('test:bundle', 'qunit:bundle');
    grunt.registerTask('bundle', 'requirejs');
    grunt.registerTask('coverage', 'qunit-cov');
    grunt.registerTask('test', 'junit:env qunit:src');
    grunt.registerTask('default', 'lint test');
    grunt.registerTask('serve:src', 'HTTP serve src on port 8080', function () {
        // Note: using connect['static'], as jshint complains about connect.static, because static is a reserved word
        connect(connect['static']('src')).listen(8080);
    });
    grunt.registerTask('serve:bundle', 'HTTP serve bundle on port 8081', function () {
        // Note: using connect['static'], as jshint complains about connect.static, because static is a reserved word
        connect(connect['static']('output/bundle')).listen(8081);
    });
};