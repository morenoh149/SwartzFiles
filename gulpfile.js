var gulp = require('gulp'),
    style = require('gulp-stylus'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    sync = require('browser-sync'),
    koutoSwiss = require('kouto-swiss');

var paths = {
  stylus: './stylus/style.styl',
  css: './public/styles/',
  jade: './templates/index.jade',
  html: './public/'
};

gulp.task('sync', ['watch'], function() {
  'use strict'; // placed within first function to avoid warning
  sync({
    server: {
      baseDir: 'public/'
    },
    watchFiles: [
      paths.html + 'index.html',
      paths.css + 'style.css'
    ],
    open: true,
    port: 9000
  });
});

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(paths.html));
});

gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(style({
      use: koutoSwiss(),
      'include css': true
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('watch', ['jade', 'stylus'], function() {
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.jade, ['jade']);
});

gulp.task('default', ['stylus', 'jade', 'watch', 'sync']);
