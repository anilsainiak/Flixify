const mongoose = require('mongoose');

const RecentlyPlayedSchema =new mongoose.Schema(
    {
        userId:{type:String,required:true},
        movieId:{type:String,required:true},
        timeStamp:{type:Number,required:true}
    },
    {timestamps:true}
);

module.exports = mongoose.model('recentlyPlayed',RecentlyPlayedSchema);