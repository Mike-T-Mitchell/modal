var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('uglify', function () {
    'use strict';
    return gulp.src('./assets/js/modal.prototype.js')
        .pipe(uglify())
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(gulp.dest('./assets/js/'));
});