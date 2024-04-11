const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    pid:{type:Number,required:true,unique:true},
    screens:{type:Number,required:true},
    price:{type:Number,required:true},
    maxRes:{type:Number,required:true},
    name:{type:String,required:true}
})

module.exports = mongoose.model('package',packageSchema);