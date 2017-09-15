var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var wait = require('gulp-wait');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
    return gulp.src('public/assets/scss/styles.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/assets/css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', ['styles'], function() {
    gulp.watch('public/assets/scss/*.scss', ['styles']);
});