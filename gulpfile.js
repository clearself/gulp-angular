var gulp = require('gulp');
var browserSync = require('browser-sync'); //自动刷新
var minifyCSS = require('gulp-minify-css'); //css优化压缩
var imagemin = require('gulp-imagemin'); //图片优化压缩
var cache = require('gulp-cache'); //缓存
var uglify = require('gulp-uglify'); //js压缩
var concat = require('gulp-concat');  //文件合并
var ngmin = require('gulp-ngmin'); //Angular  min 
var order = require('gulp-order'); // 文件合并时按顺序
var stripDebug = require('gulp-strip-debug');// 去掉console.log() 
var runSequence = require('run-sequence'); //  添加版本号
var rev = require('gulp-rev');
var less = require('gulp-less');
var sass = require('gulp-sass');
var revCollector = require('gulp-rev-collector'); 

var filePath = {
		root:'./',
		src: 'src/',
		dist: 'dist/',
		rev:'rev/'
	}
//实时刷新页面
gulp.task('f5reload', function() {
	browserSync({
		open:false,
		server: {
			baseDir: filePath.dist
		}
	})
})

//html
gulp.task('file_html', function() {
		gulp.src([filePath.src + '*.html','!'+filePath.src +'index.html'])
			.pipe(gulp.dest(filePath.dist))
			.pipe(browserSync.reload({
				stream: true
			}));
	})
//css 压缩
gulp.task('minCSS', function() {
	gulp.src(filePath.src + 'css/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(gulp.dest(filePath.dist + 'css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//css 压缩
gulp.task('copyCSS', function() {
	gulp.src(filePath.src + 'css/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(filePath.src + 'css'))
});
//js
gulp.task('minJS', function() {
	gulp.src([
			filePath.src + 'js/*.js'
			])
		.pipe(ngmin({dynamic: false}))
		.pipe(stripDebug()) 
		.pipe(uglify({outSourceMap: false}).on('error', function (e) { //  压缩时显示出错 行
			console.log(e)
		}))
		.pipe(order([
			filePath.src+'js/app.js',
			filePath.src+'js/*.js'	
			]))
		.pipe(concat('all.min.js')) 
		.pipe(gulp.dest(filePath.dist + 'js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//图片优化
gulp.task('minImage', function() {
	gulp.src(filePath.src + 'images/*.+(png|jpg|svg|gif|jpeg)')
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest(filePath.dist + 'images'))
})
//css 版本号生成  //   这个不能和文件压缩写一起 ，反正么成功，所以分开写了
gulp.task('revCSS',function(){
	gulp.src(filePath.src + 'css/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(rev())
		.pipe(rev.manifest())
		.pipe(gulp.dest(filePath.dist + 'css'))
})
//给js添加版本号
gulp.task('revJs',function(){
	gulp.src([
			filePath.src + 'js/*.js'])
		.pipe(ngmin({dynamic: false}))
		.pipe(stripDebug()) 
		.pipe(uglify({outSourceMap: false}).on('error', function (e) { //  压缩时显示出错 行
			console.log(e)
		}))
		.pipe(order([
			filePath.src+'js/app.js',
			filePath.src+'js/*.js'	
			]))
		.pipe(concat('all.min.js')) 
		.pipe(rev())
		.pipe(rev.manifest())
		.pipe(gulp.dest(filePath.dist + 'js'))
		.pipe(browserSync.reload({
			stream: true
		}));
})
//将css,js带版本号的形式同步到index.html中
gulp.task('revHtml',function(){
	gulp.src([filePath.dist+'css/*.json',filePath.dist+'js/*.json',filePath.dist+'index.html'])
		.pipe(revCollector())
		.pipe(gulp.dest(filePath.dist))
})
// 版本号 替换 /
gulp.task('dev',function(done){
	condition = false;
	runSequence(
        ['revCSS'],
        ['revHtml'],
        ['revJs'],
        done);
})
//监听文件变化
gulp.task('watch', ['f5reload', 'file_html', 'minImage', 'minCSS','minJS','copyCSS'], function() {
	gulp.watch(filePath.src + 'js/*.js', ['minJS']); //监听js变化
	gulp.watch(filePath.src + 'css/*.scss', ['minCSS','copyCSS']); //监听css变化
	gulp.watch(filePath.src + '*.html', ['file_html']); //监听html变化
	gulp.watch(filePath.src + 'images/*', ['minImage']); //监听image变化
})

//默认任务
gulp.task("default", ['dev',"watch"]);