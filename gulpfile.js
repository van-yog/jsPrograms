"use strict";
let gulp = require("gulp");
let fileinclude = require("gulp-file-include");
let concat = require("gulp-concat");
let imagemin = require("gulp-imagemin");
let clean = require("gulp-clean");
let cssmin = require("gulp-cssmin");
let rename = require("gulp-rename");
let minify = require("gulp-minify");
let browserSync = require("browser-sync").create();
let reload = browserSync.reload;

gulp.task("html", function() {
  return gulp
    .src(["./index.html", "./history/**/*.html", "./programs/**/*.html"], {
      base: "./"
    })
    .pipe(fileinclude())
    .pipe(gulp.dest("build"));
});

gulp.task("css", function() {
  return gulp
    .src(["./programs/**/*.css", "./history/**/*.css"], { base: "./" })
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build"));
});

gulp.task("js", function() {
  return gulp
    .src("./programs/**/*.js", { base: "./" })
    .pipe(minify())
    .pipe(gulp.dest("build"));
});

gulp.task("css:libs", function() {
  return gulp
    .src("./src/css/*.css")
    .pipe(concat("libs.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest("build/src/css"));
});

gulp.task("js:libs", function() {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("libs.min.js"))
    .pipe(gulp.dest("build/src/js"));
});

gulp.task("img", function() {
  return gulp
    .src(
      [
        "./src/**/*.{jpg,png}",
        "./history/**/*.{jpg,png}",
        "./programs/**/src/img/*.{jpg,png}"
      ],
      {
        base: "./"
      }
    )
    .pipe(imagemin())
    .pipe(gulp.dest("build"));
});

gulp.task("audio", function() {
  return gulp
    .src("./programs/**/src/audio/**.*", { base: "./" })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return gulp.src("build", { read: false }).pipe(clean());
});

gulp.task(
  "build",
  gulp.parallel("html", "css", "js", "js:libs", "css:libs", "img", "audio")
);

gulp.task("webserver", function() {
  browserSync.init({
    server: "./build"
  });

  gulp
    .watch(
      ["./index.html", "./history/**/*.html", "./programs/**/*.html"],
      gulp.series("html")
    )
    .on("change", reload);
  gulp
    .watch(["./programs/**/*.css", "./history/**/*.css"], gulp.series("css"))
    .on("change", reload);
  gulp.watch("./programs/**/*.js", gulp.series("js")).on("change", reload);
  gulp.watch("./src/js/*.js", gulp.series("js:libs")).on("change", reload);
  gulp.watch("./src/css/*.css", gulp.series("css:libs")).on("change", reload);
  gulp
    .watch(
      [
        "./src/**/*.{jpg,png}",
        "./history/**/*.{jpg,png}",
        "./programs/**/src/img/*.{jpg,png}"
      ],
      gulp.series("img")
    )
    .on("change", browserSync.reload);
  gulp
    .watch("./programs/**/src/audio/**.*", gulp.series("audio"))
    .on("change", browserSync.reload);
});

gulp.task("default", gulp.series("build", "webserver"));
