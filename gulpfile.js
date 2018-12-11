// 引入gulp

const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglyfly = require('gulp-uglyfly');
// gulp-sass-china
// const sass = require("gulp-sass-china")
// 服务器环境搭建;
const connect = require("gulp-connect");
// 代理服务器;

const proxy = require("http-proxy-middleware")

// 1. html => 1. 转存 2. 自动刷新;
// 2. js => babel 编译 es6 -> es5 || 压缩 || 合并 || 制作索引;
// 3. sass => 编译成css;
// 4. 监听 => js , html , css 活动之后自动刷新;
// 5. 服务器及代理功能;

// dev

gulp.task("html",()=>{
      return  gulp.src(["./src/pages/*.html","!./src/pages/mySecret.html"]).pipe(gulp.dest("./dist/pages")).pipe(connect.reload());
})

gulp.task("js" , ()=>{
      // 需求和实现出现了冲突,应该怎么做?
      return gulp.src("./src/scripts/*.js")
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat("all.js"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("./dist/scripts"))
})

gulp.task("sass",()=>{
      return gulp.src("./src/sass/*.scss")
      .pipe(sass().on("error",sass.logError))
      .pipe(gulp.dest("./dist/css"))
})
gulp.task( "timgmin",()=>{
	return gulp.src("./src/images/*")
			
	 .pipe( gulp.dest("./dist/images"))
})

gulp.task("watch",()=>{
      gulp.watch("./src/pages/*.html",["html"]);
      gulp.watch("./src/sass/*.scss",["sass"]);
      
})



// 服务器代理;
gulp.task("connect",()=>{
      connect.server({
            root: './dist',
            port:8888,
            livereload: true,
            middleware: function(connect, opt) {
                  return [
                        proxy('/douban',  {
                              target: 'https://api.douban.com',
                              changeOrigin:true,
                              pathRewrite:{
                                    '^/douban' : "/"
                              }
                        }),
                        proxy('/mogu', {
                              target: 'https://list.mogujie.com',
                              changeOrigin: true,
                              pathRewrite:{
                                    '^/mogu' : "/"
                              }
                        })
                  ]
            }
      });
})


gulp.task("default",["watch","connect","html","js","sass","timgmin"]);

// production

gulp.task("uglyjs" , ()=>{
      // 需求和实现出现了冲突,应该怎么做?
      return gulp.src("./dist/scripts/*.js")
      .pipe(uglyfly())
      .pipe(gulp.dest("./dist/minjs"))
})

gulp.task("build",["js","uglyjs"])