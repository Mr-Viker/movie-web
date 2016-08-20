/**
 * Created by Viker on 2016/8/14.
 *
 * Model: 在Mongoose中表示匹配了Schema规则的集合，有了Model对象就可以很方便的进行数据库操作了
 */


var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie-schema');
var MovieModel = mongoose.model('MovieModel', MovieSchema);


module.exports = MovieModel;
