/**
 * Created by Viker on 2016/8/17.
 *
 * 负责和movie有关的逻辑控制
 */


var MovieModel = require('../models/movie-model');
var CommentModel = require('../models/comment-model');
var underscore = require('underscore'); //可以更改数据库中的旧值为新值


// 电影详情页
exports.detail = function(req, res) {
    var id = req.params.id;
    var user = req.session.user;
    MovieModel.findById(id, function(err, movie) {
        if(err) {
            console.log(err);
        }
        CommentModel.find({movie: id})
            .populate('from', 'username')
            .exec(function(err, comments) {
                if(err) {
                    console.log(err);
                }
                res.render('detail', {
                    title: movie.title + " - 详情页",
                    movie: movie,
                    user:user,
                    comments: comments
                });
            });
    });
};

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
exports.new = function(req, res) {
    res.render('new-movie', {
        title: '添加电影 - 后台管理页',
        movie: emptyMovie
    });
};

//[在admin/list点击更新之后跳转]
exports.update =  function(req, res) {
    var id = req.params.id;
    MovieModel.findById(id, function(err, movie) {
        if(err) {
            console.log(err);
        }
        res.render('new-movie', {
            title: "更新电影 - 后台管理页",
            movie: movie
        });
    });
};

//将post的电影数据添加至数据库 [从admin/new点击提交之后的处理]
exports.add = function(req, res) {
    // 需要判断是新数据还是修改之后的更新数据
    var postMovie = req.body.movie;
    var id = postMovie._id;
    var newMovie;

    if(id != 'undefined') { /*如果是更新数据*/
        MovieModel.findById(id, function(err, movie) {
            if(err) {
                console.log(err);
            }
            newMovie = underscore.extend(movie, postMovie);
        });
    } else { /*如果是新数据*/
        newMovie = new MovieModel({
            title: postMovie.title,
            doctor: postMovie.doctor,
            country: postMovie.country,
            show_year: postMovie.show_year,
            poster: postMovie.poster,
            language: postMovie.language,
            flash: postMovie.flash,
            summary: postMovie.summary
        });
    }
    newMovie.save(function(err, movie) {
        if(err) {
            console.log(err);
        }
        res.redirect('/admin/movie/list');
    });
};

//后台电影列表页
exports.movieList = function(req, res) {
    MovieModel.fetch(function(err, movies) {
        if(err) {
            console.log(err);
        }
        res.render('movielist', {
            title: '电影列表 - 后台管理页',
            movies: movies
        });
    });
};

//列表页中点击删除电影按钮时发送的请求
exports.del = function(req, res) {
    var id = req.url.split('?id=')[1];
    if(id) {
        MovieModel.remove({_id: id}, function(err, movie) {
            if(err) {
                console.log(err)
            } else {
                res.json({status: 1});
            }
        });
    }
};
