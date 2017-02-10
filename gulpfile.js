var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function() {
    return gulp.src('public/assets/js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'));
});

gulp.task('styles', function() {
    return gulp.src('public/assets/scss/app.scss')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', ['scripts', 'styles'], function() {
    gulp.watch('public/assets/js/*.js', ['scripts']);
    gulp.watch('public/assets/scss/*.scss', ['styles']);
});
