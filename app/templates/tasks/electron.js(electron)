var gulp = require('gulp');
var electron = require('gulp-electron');
var packageJson = require('../client/package.json');
 
module.exports = function() {
    gulp.src("")
    .pipe(electron({
        src: './dist/client',
        packageJson: packageJson,
        release: './dist/release',
        cache: './.cache/electron',
        version: 'v0.27.2',
        packaging: true,
        platforms: ['win32-ia32', 'darwin-x64']
    }))
    .pipe(gulp.dest(""));
};
