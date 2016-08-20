/**
 * Created by Viker on 2016/8/17.
 *
 * 负责和comment有关的逻辑控制
 */


var CommentModel = require('../models/comment-model');


//提交评论
exports.save = function(req, res) {
    var _comment = req.body.comment;
    var movieId = _comment.movie;
    var comment = new CommentModel(_comment);

    comment.save(function(err, comment) {
        if(err) {
            console.log(err);
        }
        res.redirect('/movie/detail/' + movieId);
    });
};