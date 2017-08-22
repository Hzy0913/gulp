# gulp功能总结，github项目地址：https://github.com/Hzy0913/gulp
> 多功能gulp。包括压缩html、css、js、img、自动编译less，自动刷新浏览器，还包括使用tinypng压缩图片。自动把页面上所有的css、js打包成一个压缩后的js、css。
> 

## clone 项目以后
> 执行 npm install 安装依赖
> 

## 目录结构
按照demo  目录分为


在html文件中引入  
css、js
> 将你要引入的css和js文件分别用__build__注释包括起来，具体使用后方法如下。这样可以在执行压缩命令时，将你的css和js分别压缩成一个文件。  
> 如果你要使用less预编译。请在css目录下创建style.less文件，并在html中引入和这个.less文件名相同的.css文件。不需要引入less文件。

code：
```
<!-- 引入 css (如果需要编译less,只需要保持.less的名字跟.css的名字相同即可)-->
    <!-- build:css css/style.min.css -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/lessstyle.css">
    <!-- endbuild -->
		
<!-- 引入 js -->
    <!-- build:js js/main.min.js -->
    <script src="js/jquery.min.js"></script>
    <script src="js/skrollr.js"></script>
    <!-- endbuild -->
```
## 使用tinypng压缩图片
> tinypng是一个高质量压缩图片的网站，官网__https://tinypng.com/__，使用gulp我们可以工程化tinypng压缩图片。
>   


首先你需要去tinypng官网申请一个你自己的密钥https://tinypng.com/developers，然后将密钥粘贴在如下示例代码的key中（示例里的key密钥不正确，需要你申请一个你自己的密钥）

```
gulp.task("minpng", function(){
    gulp.src('img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'If2g1qF1A4jQRa9MtTYt9ypAvCyS4JL8',
            sigFile: '',
            log: true
        }))
        .pipe(gulp.dest('dist/img'));
})
```
然后执行gulp minpng 即可压缩你img目录下的所有图片（每个密钥每月只能压缩五百张）
## 上线打包压缩
有时候上线项目时，我们想将项目进行压缩。
我们只需要按照上面目录结构里把css、js代码使用build注释包括起来，然后执行gulp minall命令
> gulp minall  命令可以压缩html、css、js、img、并把css和js分别合并压缩成一个文件
> 


## 预编译less
使用less时，我们只需要在css目录里创建less文件，然后在html中引入css文件，注意需要保持css文件和less文件名字相同即可，不需要引入less文件。因为less文件在浏览器里默认是不能被渲染的
# 自动刷新浏览器
> 执行gulp  默认命令，对就是 gulp 这个一个单词，便可以自动预编译less、刷新css、html

__想使用如上gulp工具，可以去我的github，有具体的代码https://github.com/Hzy0913/gulp__
