var gulp = require("gulp");
var htmlclean = require("gulp-htmlclean"); //html压缩
var imagemin = require("gulp-imagemin"); //图片压缩
var uglify = require("gulp-uglify"); //js压缩
var strip = require("gulp-strip-debug"); //去除调试代码
var concat = require("gulp-concat"); //js文件合并
var less = require("gulp-less"); //编译less
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require('gulp-connect');
var devMode = process.env.NODE_ENV == "development";

//gulp.src() 读文件
//gulp.dest() 写任务
//gulp.task() 任务
//gulp.watch() 监听
var folder = {
  src: "src/",
  dist: "dist/"
};

gulp.task("html", function() {
  var page = gulp.src(folder.src + "html/*").pipe(connect.reload());
  if (!devMode) {
    page.pipe(htmlclean());
  }
  page.pipe(gulp.dest(folder.dist + "html/"));
});
gulp.task("images", function() {
  gulp
    .src(folder.src + "images/*")
    .pipe(imagemin())
    .pipe(gulp.dest(folder.dist + "images/"));
});
gulp.task("js", function() {
  var page = gulp.src(folder.src + "js/*").pipe(connect.reload());
  if (!devMode) {
    page
      .pipe(strip())
      // .pipe(concat('main.js'))
      .pipe(uglify());
  }
  page.pipe(gulp.dest(folder.dist + "js/"));
});
gulp.task("css", function() {
  var options = [autoprefixer(), cssnano()];
  var page = gulp.src(folder.src + "css/*").pipe(less()).pipe(connect.reload());
  if (!devMode) {
    page.pipe(postcss(options));
  }
  page.pipe(gulp.dest(folder.dist + "css/"));
});
gulp.task("watch", function() {
  gulp.watch(folder.src + "html/*", ["html"]);
  gulp.watch(folder.src + "css/*", ["css"]);
  gulp.watch(folder.src + "js/*", ["js"]);
  gulp.watch(folder.src + "images/*", ["images"]);
});
gulp.task('server', function () {
    connect.server({
        port: '8090',
        livereload: true
    });

})
gulp.task("default", ["html", "images", "js", "css", "watch",'server']);
