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

gulp.task('js', function () {
    return gulp.src('./app/**/*.js')
        .pipe(gulp.dest('./dist'))
});

gulp.task('js:watch', function () {
	gulp.watch('./app/**/*.js', ['js']);
});

gulp.task('html', function () {
    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist'))
});

gulp.task('html:watch', function () {
	gulp.watch('./app/**/*.html', ['html']);
});

gulp.task('ico', function () {
	return gulp.src(['./app/*.ico', './app/**/*.jpg'])
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

gulp.task('serve', ['html:watch', 'js:watch', 'sass:watch']);

gulp.task('default', ['bower', 'sass', 'js', 'html', 'ico']);	