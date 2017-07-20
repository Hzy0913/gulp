# gulp
gulp压缩文件，自动编译，自动刷新
***************************
执行npm install 命令安装依赖
执行 npm install gulp -g  安装全局gulp

执行gulp 默认命令执行自动刷新，可以自动编译less，和自动刷新css，html
--------------------------------------
执行 gulp minpng   命令使用tinypng 压缩图片
配置项中  key：后面为在tinypng中申请的密钥，一个月可以用gulp 压缩500张图片。(自己去tinypng网站申请密钥)
---------------------------------------------------------------
执行 gulp minall  命令 执行合并js、css，并且压缩js、css、html、img  生成到dis目录
压缩前，需在要html 文件中，为要压缩的js，和css 添加注释，
如：
js：
 build:js js/main.min.js 
    <script src="js/jquery.min.js"></script>
    <script src="js/canv.js"></script>
endbuild 
css：
 build:css css/combined.css 
    <link rel="stylesheet" href="css/style.css">
 endbuild 
 
 build:js js/main.min.js  和  build:css css/combined.css    需要注释起来，readme里不显示注释就去掉了<!-- >
