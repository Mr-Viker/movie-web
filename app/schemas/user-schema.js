/**
 * Created by Viker on 2016/8/15.
 *
 * 声明[用户信息]集合中个文档字段的匹配规则
 */



var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs'); //利用md5算法加密
const SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    username: {
        unique:true,
        type:String
    },
    password:String,
    permission:{
        type:Number,
        default:0
    },
    meta: {
    createAt: {
        type: Date,
    default: Date.now()
    },
    updateAt: {
        type: Date,
    default: Date.now()
    }
}
});

// 每次存储数据之前都会调用该方法,在该方法内判断是新数据还是更新数据
UserSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    //加密密码
    var user = this;
    bcryptjs.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
            return next(err);
        }
        bcryptjs.hash(user.password, salt, function(err, hash) {
            if(err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
});


//设置一些静态方法(如查找等)，Model具有这些方法，可以通过Model.fetch()来调用
UserSchema.statics = {
    fetch: function(cb) {
        return this.find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id})
            .exec(cb);
    }
};

//设置实例方法，须实例化Model后通过model对象调用
UserSchema.methods = {
    comparePwd: function(_password, cb) {
        bcryptjs.compare(_password, this.password, function(err, isMatch) {
            if(err) {
                cb(err);
            }
            cb(null, isMatch);
        });
    }
};

module.exports = UserSchema;
