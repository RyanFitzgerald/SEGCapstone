var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function() {
    return gulp.src('public/assets/js/concat/*.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('styles', function() {
    return gulp.src('public/assets/scss/styles.scss')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', ['scripts', 'styles'], function() {
    gulp.watch('public/assets/js/concat/*.js', ['scripts']);
    gulp.watch('public/assets/scss/*.scss', ['styles']);
});
