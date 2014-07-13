gulp = require 'gulp'
coffeelint = require 'gulp-coffeelint'
mocha = require 'gulp-mocha'
istanbul = require 'gulp-istanbul'
biscotto = require 'gulp-biscotto'
coffee = require 'gulp-coffee'
clean = require 'gulp-clean'
gutil = require 'gulp-util'

srcFiles = ['./src/**/*.coffee']
libFiles = ['./lib/**/*.js']

gulp.task 'clean', ->
  gulp.src libFiles
    .pipe clean { force: true }

gulp.task 'lint', ->
  gulp.src srcFiles.concat ['./*.coffee', './spec/**/*.coffee']
    .pipe coffeelint()
    .pipe coffeelint.reporter()

gulp.task 'test', ['lint', 'build'], (cb) ->
  gulp.src libFiles
    .pipe istanbul()
    .on 'finish', ->
      gulp.src ['./spec/**/*-spec.coffee']
        .pipe mocha({
          reporter: 'spec',
          compilers: 'coffee:coffee-script'
        })
        .pipe istanbul.writeReports()
        .on 'end', cb

  return

gulp.task 'spec', ['test']

gulp.task 'docs', ->
  biscotto()
    .pipe gulp.dest './docs'

gulp.task 'build', ['clean'], ->
  gulp.src srcFiles
    .pipe coffee({ bare: true }).on('error', gutil.log)
    .pipe gulp.dest 'lib'

gulp.task 'doc', ['docs']

gulp.task 'default', ['build'], (cb) ->
  require './lib'
