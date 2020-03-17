"use strict";
let gulp = require("gulp");
let rename = require("gulp-rename");
let rigger = require("rigger");

gulp.task("html", function() {
  return gulp
    .src("./index.html") //Выберем файлы по нужному пути
    .pipe(rename("f.html")) //Прогоним через rigger
    .pipe(gulp.dest("build/js/")); //Выплюнем их в папку build
});
