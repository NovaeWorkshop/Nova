'use strict';

/**
 * Compile Server Typescript sources
 */

var gulp        = require('gulp');
var typescript  = require('gulp-typescript');
var sourcemaps  = require('gulp-sourcemaps');

var tsProject = {
    module: 'node'
};

var tsSources = [
    'server/**/*.ts'
];

module.exports = function () {
    var tsResult = gulp.src(tsSources)
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject));

    return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('server/'));
};
