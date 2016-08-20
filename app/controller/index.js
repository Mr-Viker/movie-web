/**
 * Created by Viker on 2016/8/17.
 *
 * 负责对首页进行逻辑控制
 */


var MovieModel = require('../models/movie-model');


exports.index = function(req, res) {
    //使用在Schema中声明的静态方法Model.fetch来获取数据库的数据并传入回调函数
    MovieModel.fetch(function(err, movies) {
        if(err) {
            console.log(err);
        }
        res.render('index', {
            title: '首页 - 电影天堂',
            movies: movies
        });
    });
};
