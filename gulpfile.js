const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');


const dev = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./src/**/*', gulp.series('clean', gulp.parallel('html', 'js', 'css', 'images', 'icons'), (next) => {
        browserSync.reload()
        next();
    }))
}

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('js', function() {
    return gulp.src('./src/**/*.js')
    .pipe(concat('script.js'))
    .pipe(terser())
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('css', function() {
    return gulp.src('./src/scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer({
			cascade: false
    }))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('images', function () {
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
})

gulp.task('icons', function () {
    return gulp.src('./src/icons/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/icons'))
})

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
    .pipe(clean())
})

gulp.task('build', gulp.parallel('html', 'js', 'css', 'images', 'icons'))
gulp.task('dev', dev)