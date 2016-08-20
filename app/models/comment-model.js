/**
 * Created by Viker on 2016/8/16.
 *
 * 评论模型[集合]
 */



var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment-schema');
var CommentModel = mongoose.model('CommentModel', CommentSchema);


module.exports = CommentModel;