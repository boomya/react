var gulp = require('gulp'),
    notify = require('gulp-notify');
    connect = require('gulp-connect'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    port = process.env.port || 5000;

gulp.task('browserify', function () {
    browserify({
        entries: './js/app.js',
        debug: true
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(notify({ message: 'gulp generated' }));

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
