// Author: Wang Qun
// Email: qun.wang@live.cn 
var gulp = require('gulp')
var inline = require('gulp-inline')
var uglify = require('gulp-uglify')
var cleancss = require('gulp-clean-css')
var htmlmin = require("gulp-htmlmin")
var pump = require('pump')

var dir = './public'

gulp.task('default',function(cb) {
  var opts = {
         removeComments: true,
         collapseWhitespace: true,
         removeEmptyAttributes: true,
         removeEmptyElements: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true,
  } // 参数详情请参考https://github.com/kangax/html-minifier
  pump([
    gulp.src('./public/**/*.html'),
    inline({
        base: './public/',
        js: uglify,
        css: cleancss,
        disabledTypes: ['svg', 'img']
    }),
    htmlmin(opts),
    gulp.dest(dir)
  ], cb)
})
