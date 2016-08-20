/**
 * Created by Viker on 2016/8/17.
 *
 * 负责和user有关的逻辑控制
 */


var UserModel = require('../models/user-model');


//用户权限
exports.permiss = function(req, res, next) {
    var user = req.session.user;
    if(!user) {
        res.redirect('/user/signin', {
            title: '用户登录'
        });
    } else if(user.permission > 10 || user.username === 'a') {
        next();
    } else {
        res.send('你的权限不够，无法访问该页面');
    }
};

//用户注册
exports.signup = function(req, res) {
    res.render('signup', {
        title: '用户注册'
    });
};

//用户注册提交
exports.signupVetify = function(req, res) {
    var _user = req.body.user;
    //判断数据库是否已经存在该有户名
    UserModel.findOne({username: _user.username}, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(user) {
            res.send('该用户名已存在');
        } else {
            var user = new UserModel(_user);
            user.save(function(err, user) {
                if(err) {
                    console.log(err);
                }
                req.session.user = user;
                res.redirect('/');
            });
        }
    });
};

//用户登录
exports.signin = function(req, res) {
    res.render('signin', {
        title: '用户登录'
    });
};

// 用户登录提交
exports.signinVetify = function(req, res) {
    var _user = req.body.user;
    UserModel.findOne({username: _user.username}, function(err, user) {
        if(err) {
            console.log(err)
        }
        if(user) {
            user.comparePwd(_user.password, function(err, isMatch) {
                if(err) {
                    console.log(err)
                }
                if(isMatch) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    res.send('密码错误');
                }
            });
        } else {
            res.send('用户名不存在');
        }
    });
};

//退出登录
exports.logout = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};

//用户列表 - 后台管理
exports.userList = function(req, res) {
    UserModel.fetch(function(err, users) {
        if(err) {
            console.log(err);
        }
        res.render('userlist', {
            title: '用户列表 - 后台管理',
            users: users
        });
    });
};