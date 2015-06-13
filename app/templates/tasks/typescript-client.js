'use strict';

/**
 * Compile Client Typescript sources
 */

var gulp        = require('gulp');
var concat      = require('gulp-concat');
var typescript  = require('gulp-typescript');
var sourcemaps  = require('gulp-sourcemaps');

var tsProject = {
    sortOutput: true
};

var tsSources = [
    'client/app.d.ts',
    'client/app.ts',
    'client/animations/*.ts',
    'client/directives/**/*.ts', '!client/directives/**/*.spec.ts',
    'client/filters/**/*.ts', '!client/filters/**/*.spec.ts',
    'client/services/**/*.ts', '!client/services/**/*.spec.ts',
    'client/views/**/*.ts', '!client/views/**/*.spec.ts', '!client/views/**/*.e2e.ts'
];

module.exports = function () {
    var tsResult = gulp.src(tsSources)
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject));

    return tsResult.js
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('client/'));
};
