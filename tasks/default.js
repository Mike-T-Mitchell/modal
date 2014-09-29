var gulp = require('gulp');
gulp.task('default', ['compass'], function () {
    'use strict';
    // execute watchers
    gulp.watch('./src/sass/**/*.scss', ['compass']);
});