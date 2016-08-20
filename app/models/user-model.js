/**
 * Created by Viker on 2016/8/16.
 *
 * 用户模型[集合]
 */



var mongoose = require('mongoose');
var UserSchema = require('../schemas/user-schema');
var UserModel = mongoose.model('UserModel', UserSchema);


module.exports = UserModel;