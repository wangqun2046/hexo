// Author: Wang Qun
// Email: qun.wang@live.cn 
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var minifyHTML = require("gulp-minify-html");
var htmlclean = require('gulp-htmlclean');
var gutil = require('gulp-util');
var minifyInline = require('gulp-minify-inline');
var inline = require('gulp-inline')
var inlineimage = require('gulp-inline-image');
var imagemin = require('gulp-imagemin');

var dir = './public'

gulp.task('minify-html',function() {
  var opts = {
         removeComments: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true,
  };
  gulp.src('./public/**/*.html')
    .pipe(inline({
        base: './public/',
        disabledTypes: ['svg', 'img'], 
    }))
    .pipe(minifyInline())
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(dir));
});

gulp.task('minify-css', function() {
    gulp.src('./public/**/*.css')
        .pipe(inlineimage())
        .pipe(minifycss())
        .pipe(gulp.dest(dir));
});

gulp.task('minify-js', function() {
    gulp.src('./public/**/*.js')
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest(dir));
});

gulp.task('images-photos', function () {
    gulp.src('./photos/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
});


gulp.task('images-public', function () {
    gulp.src('./public/**/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(dir))
});

gulp.task('default', [
    'minify-css','minify-js','minify-html',
    'images-photos','images-public']
    );
