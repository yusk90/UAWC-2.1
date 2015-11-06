'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync').create(),
    replace = require('gulp-replace'),
    url = require('gulp-css-url-adjuster'),
    spritesmith = require('gulp.spritesmith'),
    clean = require('del'),
    //shell = require('gulp-shell'),
    gulpIf = require('gulp-if'),
    requirejsOptimize = require('gulp-requirejs-optimize');

// Clean dist
gulp.task('clean', function () {
    clean(['dist', 'css-compiled', 'js-optimized']);
});

// Fonts
gulp.task('fonts', function(){
    gulp.src(['fonts/**/*.*'])
        .pipe(gulp.dest('./dist/fonts'));
});

// LESS
gulp.task('compile-less', function () {
    return gulp.src(['less/*.less', '!less/import/*.*'])
    .pipe(less())
    .pipe(gulp.dest('css-compiled/'));
});

// CSS
gulp.task('css', ['compile-less'], function() {
    return gulp.src('css-compiled/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(url({
            replace: ['../../fonts', '../fonts']
        }))
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
});

// Dependencies
gulp.task('css-dependencies', function () {
    gulp.src([
        'bower_components/normalize-css/normalize.css',
        'node_modules/dragula/dist/dragula.min.css'
    ])
        .pipe(concatCss('libs.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});

// JS
gulp.task('js-develop', function() {
    gulp.src([
        'js/**/',
        'js/*',
        '!js/common.js'
    ])
        .pipe(gulp.dest('dist/js'));

    gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/underscore/underscore-min.js',
        'node_modules/backbone/backbone-min.js',
        'node_modules/backbone.localstorage/backbone.localStorage-min.js',
        'node_modules/dragula/dist/dragula.min.js',
        'node_modules/requirejs-text/text.js'
    ])
        .pipe(gulp.dest('dist/js/libs/'));

    gulp.src(['js/common.js'])
        .pipe(replace('../node_modules/jquery/dist', 'libs'))
        .pipe(replace('../node_modules/underscore', 'libs'))
        .pipe(replace('../node_modules/backbone.localstorage', 'libs'))
        .pipe(replace('../node_modules/backbone', 'libs'))
        .pipe(replace('../node_modules/dragula/dist', 'libs'))
        .pipe(replace('../node_modules/requirejs-text', 'libs'))
        .pipe(gulp.dest('dist/js/'));
});

/*gulp.task('js-build', shell.task([
        'node tools/r.js -o tools/build.js'
    ])
);*/

gulp.task('js-build', ['requirejs-optimization'], function() {
    gulp.src('js-optimized/*')
        .pipe(gulp.dest('dist/js'));
    gulp.src('js/libs/require.js')
        .pipe(gulp.dest('dist/js/libs/'));
});

gulp.task('requirejs-optimization', function() {
    var commonIncludes = [
        'common',
        'jquery',
        'underscore',
        'backbone',
        'localstorage',
        'helpers',
        'BaseView',
        'UserModel',
        'UsersCollection',
        'users'
        ],
        commonOptions = {
            mainConfigFile: 'js/common.js',
            name: 'common',
            include: commonIncludes
        };

    function moduleOptions (file) {
        var moduleName = file.relative.split('-')[0];

        return {
            mainConfigFile: 'js/common.js',
            name: moduleName + '-script',
            include: 'app/' + moduleName + '-init',
            exclude: commonIncludes
        }
    }

    return gulp.src(['js/*.js'])
        .pipe(gulpIf('common.js',
            requirejsOptimize(commonOptions),
            requirejsOptimize(moduleOptions)))
        .pipe(gulp.dest('js-optimized/'));
});

// HTML
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(gulp.dest('dist/'))
});

// Sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src('images/small_icon/*.png').pipe(spritesmith({
        imgName: '../images/sprite.png',
        cssName: 'sprite.css'
    }));
    var imgStream = spriteData.img
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
    var cssStream = spriteData.css
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css/'))
});

// Images compress
gulp.task('images', function () {
    gulp.src(['images/**/*.*','!images/small_icon/*.*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        browser: 'google-chrome'
    });
    gulp.watch('less/*.less', ['less']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

// Watch
gulp.task('watch', function() {
    gulp.watch('*.html', ['html']);
    gulp.watch('less/**/*.less', ['css']);
    gulp.watch([
        'js/*.js',
        'js/**/*.js',
        'js/**/*.html',
        'js/**/**/*.js'
    ], ['js-develop']);
});

// Default task
gulp.task('default', ['clean', 'css-dependencies', 'fonts', 'html', 'sprite', 'images', 'css', 'js-develop', 'browser-sync', 'watch']);

gulp.task('build', ['clean', 'css-dependencies', 'fonts', 'html', 'sprite', 'images', 'css', 'js-build', 'browser-sync', 'watch']);
