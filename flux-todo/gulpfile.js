var gulp = require('gulp'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    port = process.env.port || 5000;

gulp.task('browserify', function () {
    gulp.src('./js/app.js')
        .pipe(browserify({
            transform: 'reactify',
        }))
        .pipe(gulp.dest('./dist'))
});

//live reload
gulp.task('connect', function () {
    connect.server({
        root: './',
        port: port,
        livereload: true,
    })
});

//reload js
gulp.task('js', function () {
    gulp.src('./js/**/*.js')
        .pipe(connect.reload())
});

//reload html
gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(connect.reload())
});

//watch trigger
gulp.task('watch', function () {
    gulp.watch('./dist/**/*.js', ['js']);
    gulp.watch('./*.html', ['html']);
    gulp.watch('./js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'watch']);
