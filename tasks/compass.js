var gulp = require('gulp');
var compass = require('gulp-compass');

gulp.task('compass', function () {
    'use strict';
    return gulp.src('./src/sass/**/*.scss')
        .pipe(compass({
            css: './assets/css',
            sass: './src/sass',
            style: 'compressed'
        }))
        .on('error', function (err){
            console.log(err);
        });
});