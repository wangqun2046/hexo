// Author: Wang Qun
// Email: qun.wang@live.cn 
var gulp = require('gulp');
var htmlmin = require("gulp-htmlmin");
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');

var dir = './public'

gulp.task('minify-html',function() {
  var opts = {
         collapseWhitespace: true,
         preventLineBreaks: true,
         removeComments: true,
         removeEmptyAttributes: true,
         removeEmptyElements: true,
         removeOptionalTags: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true,
  };
  gulp.src('./public/**/*.html')
    .pipe(htmlmin(opts))
    .pipe(gulp.dest(dir));
});

gulp.task('minify-css', function() {
    gulp.src('./public/**/*.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest(dir));
});

gulp.task('clean-js', function(cb) {
    pump([
        gulp.src('./public/**/*.js'),
        uglify();
        gulp.dest(dir)
        ], 
        cb
    );
});

gulp.task('default', ['minify-css','clean-js','minify-html']);
