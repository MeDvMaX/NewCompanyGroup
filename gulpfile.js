'use strict';

var gulp = require('gulp')
	sass = require('gulp-sass');

// gulp.task('build', function  () {
	
// });

gulp.task('sass', function  () {
	return gulp.src('app/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
});