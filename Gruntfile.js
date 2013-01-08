/*global module*/
/*jshint camelcase:false*/ // because of gruntConfig.qunit_junit
module.exports = function (grunt) {
    'use strict';

    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json')
    };


    // convenience
    grunt.registerTask('default', ['lint', 'test']);
    grunt.registerTask('all', ['clean', 'lint', 'test', 'coverage', 'bundle', 'test:ui']);


    // continuous integration
    grunt.registerTask('travis', ['clean', 'lint', 'test', 'bundle', 'test:ui']); // Note: coverage is not yet supported on travis because jscoverage.exe is not in path
    grunt.registerTask('teamcity:test', ['clean', 'lint', 'test', 'coverage']);
    grunt.registerTask('teamcity:bundle', ['clean', 'bundle', 'test:ui']);


    // clean
    grunt.loadNpmTasks('grunt-contrib-clean');
    gruntConfig.clean = {};
    gruntConfig.clean.output = ['output'];


    // lint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    gruntConfig.jshint = {};
    gruntConfig.jshint.options = { bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true,
        indent: 4, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, plusplus: true,
        quotmark: true, regexp: true, undef: true, unused: true, strict: true, trailing: true
    };
    gruntConfig.jshint.all = [
        'Gruntfile.js',
        'src/**/*.js',
        '!src/libs/**/*.js',
        '!src/test/libs/**/*.js'
    ];
    grunt.registerTask('lint', 'jshint');


    // test
    grunt.loadNpmTasks('grunt-contrib-qunit');
    gruntConfig.qunit = {};
    gruntConfig.qunit.src = ['src/test/index.html'];
    gruntConfig.qunit.serve = ['http://localhost:8082/test/index.html'];
    gruntConfig.qunit.ui = ['http://localhost:8083/uitest/index.html'];
    gruntConfig.qunit.uiSrc = ['http://localhost:8080/uitest/index.html'];
    grunt.loadNpmTasks('grunt-qunit-junit');
    gruntConfig.qunit_junit = {
        options: {
            dest: 'output/testresults'
        }
    };


    // watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    gruntConfig.watch = {};
    gruntConfig.watch.scripts = {
        files: ['src/**/*.*'],
        tasks: ['lint', 'test']
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
    grunt.registerTask('test:ui:src', ['qunit_junit', 'connect:src', 'qunit:uiSrc']); // Note: to get better stack traces on failures


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
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    gruntConfig.requirejs = {};
    gruntConfig.requirejs.bundle = {
        options: {
            name: 'main',
            appDir: 'src',
            baseUrl: 'app',
            mainConfigFile: 'src/app/config.js',
            dir: 'output/optimized'
        }
    };
    grunt.loadNpmTasks('grunt-contrib-copy');
    gruntConfig.copy = {};
    gruntConfig.copy.bundle = {
        files: {
            'output/bundle/': [
                'output/optimized/index.html',
                'output/optimized/app/css/index.css',
                'output/optimized/libs/require.js',
                'output/optimized/app/config.js',
                'output/optimized/app/main.js'
            ]
        }
    };
    grunt.registerTask('bundle', ['requirejs:bundle', 'copy:bundle']);
    gruntConfig.connect.bundle = {
        options: {
            port: 8081,
            base: 'output/bundle'
        }
    };
    gruntConfig.connect.optimized = {
        options: {
            port: 8083,
            base: 'output/optimized'
        }
    };
    grunt.registerTask('test:ui', ['qunit_junit', 'connect:optimized', 'qunit:ui']);


    // error handling
    // ToDo: awaits https://github.com/gruntjs/grunt-contrib-qunit/pull/11
    grunt.event.on('qunit.error.onError', function (msg, stack) {
        grunt.util._.each(stack, function (entry) {
            grunt.log.writeln(entry.file + ':' + entry.line);
        });
        grunt.warn(msg);
    });


    // grunt
    grunt.initConfig(gruntConfig);

};