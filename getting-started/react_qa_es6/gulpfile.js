var gulp = require('gulp'),
    connect = require('gulp-connect'),
    // browserify = require('gulp-browserify'),
    // concat = require('gulp-concat'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    port = process.env.port || 5000;

gulp.task('browserify', function () {
    browserify({
        entries: './app/js/main.js',
        debug: true
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'));

});

// gulp.task('browserify', function () {
//     gulp.src('./app/js/main.js')
//         .pipe(browserify({
//             transform: 'reactify',
//         }))
//         .pipe(gulp.dest('./dist/js'))
// });

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
    gulp.watch('./app/js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'watch']);
