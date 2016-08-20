/**
 * Created by Viker on 2016/8/17.
 *
 * 路由器
 */

var IndexCtrl = require('../app/controller/index');
var MovieCtrl = require('../app/controller/movie');
var UserCtrl = require('../app/controller/user');
var CommentCtrl = require('../app/controller/comment');


module.exports = function(app) {

    //会话持久预处理 将session中的user赋值为本地变量，这样在jade模板中就能获取到该user了
    app.use(function(req, res, next) {
        app.locals.user =  req.session.user;
        next();
    });

/**
 * 前台路由
 */
    /*Index*/
    //主页
    app.get('/', IndexCtrl.index);

    /*Movie*/
    //电影详情页
    app.get('/movie/detail/:id', MovieCtrl.detail);

    /*User*/
    //用户注册
    app.get('/user/signup',UserCtrl.signup);
    //用户注册提交
    app.post('/user/signup/vetify',UserCtrl.signupVetify);
    // 用户登录
    app.get('/user/signin', UserCtrl.signin);
    // 用户登录提交
    app.post('/user/signin/vetify', UserCtrl.signinVetify);
    //退出登录
    app.get('/user/logout', UserCtrl.logout);
    //提交评论
    app.post('/user/comment', CommentCtrl.save);


/**
 * 后台路由
 */
    /*Movie*/
    //后台电影修改页
    var emptyMovie = {
        title: '',
        doctor: '',
        country: '',
        show_year: '',
        poster: '',
        language: '',
        flash: '',
        summary: ''
    };
    app.get('/admin/movie/new', UserCtrl.permiss, MovieCtrl.new);
    //[在admin/list点击更新之后跳转]
    app.get('/admin/movie/update/:id', UserCtrl.permiss, MovieCtrl.update);
    //将post的电影数据添加至数据库 [从admin/new点击提交之后的处理]
    app.post('/admin/movie/new/add', UserCtrl.permiss, MovieCtrl.add);
    //后台电影列表页
    app.get('/admin/movie/list', UserCtrl.permiss, MovieCtrl.movieList);
    //列表页中点击删除电影按钮时发送的请求
    app.delete('/admin/movie/list', UserCtrl.permiss, MovieCtrl.del);

    /*User*/
    //用户列表 - 后台管理
    app.get('/admin/user/list', UserCtrl.permiss, UserCtrl.userList);
};

