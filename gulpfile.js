// including plugins
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task("clean",  function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});


gulp.task("concat", function () {
    gulp.src([
        "./src/app.js",
        "./src/*.js"
    ]) // path to your files
    .pipe(ngAnnotate())
    .pipe(concat("favicon-progress.js"))
    .pipe(gulp.dest("dist"));
});

// task
gulp.task("minify", function () {
    gulp.src([
        "./src/app.js",
        "./src/*.js"
    ]) // path to your files
    .pipe(ngAnnotate())
    .pipe(concat("favicon-progress.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("build", ["concat", "minify"],  function () {
});


gulp.task("default", ["clean"],  function () {
    gulp.start("build");
});
