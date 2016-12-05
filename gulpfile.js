// Author: Wang Qun
// Email: qun.wang@live.cn 
var gulp = require('gulp')
var inline = require('gulp-inline')
var uglify = require('gulp-uglify')
var cleancss = require('gulp-clean-css')
var htmlmin = require("gulp-htmlmin")
var pump = require('pump')
var dir = './public'

gulp.task('minify-css', function(cb) {
  pump([
    gulp.src('./public/**/*.css'),
    cleancss({compatibility: 'ie8'}),
    gulp.dest(dir)
  ])
})

gulp.task('minify-js', function(cb) {
    pump([
        gulp.src('./public/**/*.js'),
        uglify(),
        gulp.dest(dir)
    ], cb)
})

gulp.task('minify-html', function(cb) {
  var opts = {
         removeComments: true,
         collapseWhitespace: true,
         removeEmptyAttributes: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true,
  } // 参数详情请参考https://github.com/kangax/html-minifier
  pump([
    gulp.src('./public/**/*.html'),
    inline({
        base: './public/',
        disabledTypes: ['svg', 'img']
    }),
    htmlmin(opts),
    gulp.dest(dir)
  ], cb)
})

gulp.task('default', ['minify-css', 'minify-js', 'minify-html'])
