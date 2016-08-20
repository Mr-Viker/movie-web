/**
 * Created by Viker on 2016/8/14.
 *
 * 项目入口文件
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //表单格式化
var cookieParser = require('cookie-parser'); //解析客户端请求中的cookie
var cookieSession = require('cookie-session'); //解析cookie中的session
var path = require('path');
var jade = require('jade');
var mongoose = require('mongoose');
var logger = require('morgan'); //输出信息中间件
app.locals.moment = require('moment');

var port = process.env.port || 3000; // 设置监听端口

mongoose.connect('mongodb://localhost/movie_heaven'); //连接本地数据库

app.set('views', './app/views/pages'); // 设置视图层目录
app.set('view engine', 'jade'); // 设置视图层模板渲染引擎为jade
app.use(express.static(path.join(__dirname, 'public'))); //设置静态资源目录

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cookieSession({
    secret: 'movie-heaven'
}));

// 如果是在开发环境下，设置一些配置信息
if('development' === app.get('env')) {
    app.set('showStackErrer', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

require('./config/router')(app); //获取路由器

app.listen(port);
console.log('Server has started at port: ' + port);