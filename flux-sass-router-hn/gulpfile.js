var gulp = require('gulp'),
    notify = require('gulp-notify');
    connect = require('gulp-connect'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    port = process.env.port || 5000;

var paths = {
    	sass: ['./sass/**/*.scss']
    };

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
    .pipe(notify({ message: 'gulp JS generated' }));

});

//live reload
gulp.task('connect', function () {
    connect.server({
        root: './',
        port: port,
        livereload: true,
    })
});

//reload sass
gulp.task('sass', function() {
  gulp.src('./sass/skyblue.scss')
    .pipe(sass({
        style: 'expanded',
        errLogToConsole: false,
        onError: function(err) {
            return notify().write(err);
        }
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest('./css'))
    .pipe(notify({ message: 'gulp SASS generated' }))
    .pipe(connect.reload())
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
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['browserify', 'sass']);

gulp.task('serve', ['browserify', 'sass', 'connect', 'watch']);
