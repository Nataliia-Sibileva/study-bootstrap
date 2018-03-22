var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var brawserSync = require('browser-sync').create();

var config = {
    path: {
        less: './src/less/**/*.less',
        html: './public/index.html'
    },
    output: {
        cssName: 'main-min.css',
        path: './public'
    }
};

gulp.task('less', function () {
    return gulp.src(config.path.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(brawserSync.stream());
        });

gulp.task('server', function () {
    brawserSync.init({
        server: {
            baseDir: config.output.path
        }
    }) ;
    gulp.watch(config.path.less, ['less']);
    gulp.watch(config.path.html).on('change', brawserSync.reload);
});

gulp.task('default', ['less', 'server']);