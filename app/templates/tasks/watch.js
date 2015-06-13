'use strict';

/**
 * Watch files, and do things when they changes.
 * Recompile scss if needed.
 * Reinject files
 */

var gulp       = require('gulp');<% if (filters.reload === 'livereload') { %>
var livereload = require('gulp-livereload');<% } else { %>
var bsync      = require('browser-sync');<% } %>
var watch      = require('gulp-watch');
var inject     = require('gulp-inject');
var plumber    = require('gulp-plumber');
var sass       = require('gulp-sass');
var bowerFiles = require('main-bower-files');

var toInject   = require('./config/filesToInject');
var toExclude  = require('./config/bowerFilesToExclude');

module.exports = function () {<% if (filters.reload === 'livereload') { %>

    livereload.listen();<% } %>

    gulp.watch('bower.json', function () {
        gulp.src('client/index.html')
            .pipe(inject(gulp.src(bowerFiles(), { read: false }), {
                name: 'bower',
                relative: 'true',
                ignorePath: toExclude
            }))
            .pipe(gulp.dest('client'))<% if (filters.reload === 'browsersync') { %>
            .pipe(bsync.reload({ stream: true }))<% } %>;
    });

    watch([
        'client/styles/**/*.scss',
        'client/views/**/*.scss',
        'client/directives/**/*.scss'
    ], function () {
        gulp.src('client/styles/app.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(gulp.dest('client/styles/css'))<% if (filters.reload === 'livereload') { %>
            .pipe(livereload())<% } else { %>
            .pipe(bsync.reload({ stream: true }))<% } %>;
    });

    var tsClientSources = [
        'client/app.ts',
        'client/app.d.ts',
        'client/animations/*.ts',
        'client/directives/**/*.ts', '!client/directives/**/*.spec.ts',
        'client/filters/**/*.ts', '!client/filters/**/*.spec.ts',
        'client/services/**/*.ts', '!client/services/**/*.spec.ts',
        'client/views/**/*.ts', '!client/views/**/*.spec.ts', '!client/views/**/*.e2e.ts'
    ];

    var tsServerSources = [
        'server/**/*.ts'
    ];

    var lastInjection = Date.now();

    watch(['client/app.js'], function () {
        if (Date.now() - lastInjection < 100) { return; }
        lastInjection = Date.now();
        gulp.src('client/index.html')
            .pipe(inject(gulp.src(toInject), { relative: true }))
            .pipe(gulp.dest('client'));
    });

    watch(tsClientSources, function () {
        gulp.run('typescript-client');
    });
    watch(tsServerSources, function () {
        gulp.run('typescript-server');
    });

    watch(['client/index.html', 'client/app.js'], <% if (filters.reload === 'livereload') { %>livereload.changed<% } else { %>bsync.reload<% } %>);

};
