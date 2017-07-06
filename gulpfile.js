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
    cleanCSS = require('gulp-clean-css');


// 编译less，其中plumber是防止出错崩溃的插件
gulp.task('less', function() {
    gulp.src('src/less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});


// 压缩html
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
    gulp.src('*.html')
        .pipe(replace('<link rel="stylesheet" href="css/style.css">',' <link rel="stylesheet" href="css/main.min.css">'))
        .pipe(replace('<script src="js/jquery.min.js"></script>','<script src="js/main.min.js"></script>'))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

//压缩图片
gulp.task('imgmin', function () {
    gulp.src('img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});


//key
//If3g1qF1A4jQRa9MtTYt9ypAvCyS4JL8
//ctq8a3dQWrZHA9BDcrfSZafIko9OyJAC
gulp.task("minpng", function(){
    gulp.src('img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'If3g1qF1A4jQRa9MtTYt9ypAvCyS4JL8',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('dist/img'));
})


// 将所有css文件连接为一个文件并压缩，存到dest/css
gulp.task('concatCss', function() {
    gulp.src(['css/*.css'])
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});
// 将所有js文件连接为一个文件并压缩，存到dest/js

// 按顺序合并js  gulp.src(['js/public.js','js/main.js','js/mobile.main.js'])
gulp.task('concatJs', function() {
    gulp.src(['js/jquery.min.js','js/skrollr.js','js/main.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
//js/three.min.js','js/bas.min.1.1.3.js','js/three_post.js','js/OrbitControls.js','js/LuminosityHighPassShader.js','js/UnrealBloomPass.js','js/1b4e36af86e7ae4e4d4f8a3dc.js','js/TweenMax.min.js','js/index.js',

//**************************//
//XCON 项目  HTML里注释掉 后面两个js  执行这句上线
gulp.task('min', ['htmlmin','concatCss','concatJs','imgmin']);
// 默认任务
gulp.task('default',['watch']);


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
    //gulp.watch('src/coffee/**', ['coffee']);
    //gulp.watch('src/less/**', ['less']);
    //
    //
    //// 合并压缩
    //gulp.watch('dist/css/*.css', ['concatCss']);
    //gulp.watch('dist/js/*.js', ['concatJs']);


    // 自动刷新
    gulp.watch('css/**', function() {
        browserSync.reload();
    });
    gulp.watch('*.html', function() {
        browserSync.reload();
    });

});