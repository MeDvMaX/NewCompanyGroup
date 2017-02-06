'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	bower = require('gulp-bower');
    // jshint = require('gulp-jshint');

gulp.task('sass', function  () {
	return gulp.src('./app/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./dist'))
});

gulp.task('sass:watch', function () {
	gulp.watch('./app/**/*.scss', ['sass']);
});

gulp.task('build', function () {
    return gulp.src(['./app/**/*.js', './app/**'])
        .pipe(gulp.dest('./dist'))
});

gulp.task("jshint", function() {
    gulp.src(devDir + "/js/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

var config = {
    bowerDir: './dist/bower_components'
};

gulp.task('bower', function() {
    return bower();
});

gulp.task('default', ['bower', 'sass', 'sass:watch']);