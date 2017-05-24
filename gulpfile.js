'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    sassGlob    = require('gulp-sass-glob'),
    bower       = require('gulp-bower'),
    webserver   = require('gulp-webserver'),
    jshint      = require('gulp-jshint');

var webServerPort = '9000';
var proxyServers = [
    {
        source: '/',
        target: 'http://localhost:9090/'
    }
];
// gulp.task('clean', function () {
//     return del.sync(['./dist/*', '!./dist/components/*']);
// });

gulp.task('sass', function () {
    return gulp.src('./app/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(gulp.dest('./dist'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./app/**/*.scss', ['sass']);
});

gulp.task('js', function () {
    return gulp.src('./app/**/*.js')
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('jshint-stylish'))
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

gulp.task('img', function () {
    return gulp.src(['./app/*.ico', './app/**/*.jpg'])
        .pipe(gulp.dest('./dist'))
});

gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            port: webServerPort,
            enable: true,
            proxies: proxyServers,
            directoryListing: true,
            open: true
        }));
});

gulp.task('server', ['build', 'html:watch', 'js:watch', 'sass:watch', 'webserver']);

gulp.task('build', ['sass', 'js', 'html', 'img']);