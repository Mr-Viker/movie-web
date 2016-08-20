/**
 * Created by Viker on 2016/8/14.
 *
 * Schema: 声明mongoose中model下document各field的类型
 */

var mongoose = require('mongoose'); // 引入数据库建模工具模块

//声明MovieSchema
var MovieSchema = new mongoose.Schema({
    title: String,
    doctor: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    show_year: Date,
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
MovieSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});


//设置一些静态方法(如查找等)，只有在实例化Model后才会具有这些方法
MovieSchema.statics = {
    fetch: function(cb) {
        return this.find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id})
            .exec(cb);
    },
/*    toSave: function(newMovie, cb) {
        return this.save(newMovie)
            .exec(cb);
    }*/
};


module.exports = MovieSchema;
