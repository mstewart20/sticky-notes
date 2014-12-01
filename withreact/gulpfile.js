var gulp = require("gulp");
var less = require('gulp-less');
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

// Specify the browserify task, which bundles all needed code into a single
// javascript file for easy inclusion into HTML files.
gulp.task("browserify",function() {
  var b = browserify();
  b.transform(reactify);
  b.require("react");
  b.add("./src/js/main.js");

  return b.bundle()
      .pipe(source("main.js"))
      .pipe(gulp.dest("dist/js"));
});

// Needed to compile the Material-UI LESS files into a bundled CSS file
gulp.task('css', function () {
  gulp.src('src/css/main.less')
      .pipe(less())
      .pipe(gulp.dest('dist/css'));
});

// Copies the index.html file to the distribution folder.
gulp.task("copy", function() {
  gulp.src("src/index.html")
      .pipe(gulp.dest("dist"));
});

// Specify a single "default" task which executes browserify, css and copy tasks int he right order.
gulp.task("default", ["browserify", "css", "copy"]);

// Define a simple "watch" task which will trigger a "default" task when any src files are modified.
// A more robust approach would be to use the "watchify" from https://github.com/substack/watchify
gulp.task("watch", function() {
  gulp.watch("src/**/*.*", ["default"]);
});