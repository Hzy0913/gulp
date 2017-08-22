var gulp = require('gulp'),
    less = require('gulp-less'),
    replace = require('gulp-replace'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    tinypng = require('gulp-tinypng-compress'),
    cleanCSS = require('gulp-clean-css'),
    useref = require('gulp-useref'),
    gulpSequence = require('gulp-sequence')




// 压缩html
//************************
//如果你想要换html内容，如下
//.pipe(replace('<link rel="stylesheet" href="css/style.css">',' <link rel="stylesheet" href="css/main.min.css">'))
//.pipe(replace('<script src="js/jquery.min.js"></script>','<script src="js/main.min.js"></script>'))
//************************
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('dist/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

//压缩图片(压缩图片效果比较一般)
gulp.task('imgmin', function () {
    gulp.src('img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});
//压缩图片(使用tinypng压缩图片效果很好,需要去tinypng官网申请密钥,而且每月每个密钥限500张)
//key3>2
//If2g1qF1A4jQRa9MtTYt9ypAvCyS4JL8
//ctq8a2dQWrZHA9BDcrfSZafIko9OyJAC
gulp.task("minpng", function(){
    gulp.src('img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'If2g1qF1A4jQRa9MtTYt9ypAvCyS4JL8',
            sigFile: '',
            log: true
        }))
        .pipe(gulp.dest('dist/img'));
})




// useref  链接 css js
gulp.task('mincon', function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

// 压缩css，存到dist/css
gulp.task('mincss', function() {
    gulp.src(['dist/css/*.css'])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});
// 压缩js，存到dist/js
gulp.task('minjs', function() {
    gulp.src(['dist/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});



//gulp 命令


//  压缩项目(css,js,html,img(一般效果压缩))
gulp.task( 'minall', gulpSequence( 'mincon', 'mincss', 'minjs','imgmin','htmlmin' ) );
// 默认任务  自动刷新页面，编译less
gulp.task('default',['watch']);






// 编译less，其中plumber是防止出错崩溃的插件
gulp.task('less', function() {
    gulp.src('css/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('css'));
});


// 监听任务
gulp.task('watch', function() {

    // 建立浏览器自动刷新服务器
    browserSync.init({
        server: {
        }
    });


    //// 预处理
    //gulp.watch('src/jade/**', ['jade']);
    server: "./"


    //// 预处理less
    gulp.watch('css/**.less', ['less']);


    // 自动刷新css和js
    gulp.watch('css/**', function() {
        browserSync.reload();
    });
    gulp.watch('*.html', function() {
        browserSync.reload();
    });

});