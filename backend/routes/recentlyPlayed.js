const express=require('express');
const router = express.Router();
const verify = require('../verifyToken');
const RecentlyPlayed = require('../models/recentlyPlayed');

// GET RECENTLY PLAYED
router.get('/',verify,async(req,res,next)=>{
    const userId = req.query.userId;
    const movieId = req.query.movieId;
    try{
        const result = await RecentlyPlayed.findOne({
            userId:userId,
            movieId:movieId
        });
        if(!result){
            return res.status(200).json({message:"notFound"});
        }
        res.status(200).json({data:result,message:'success'});
    }catch(err){
        res.status(500).json("internal server error");
    }
})

// POST RECENTLY PLAYED
router.post('/',verify,async(req,res,next)=>{
    const recentlyPlayed = new RecentlyPlayed(req.body)
    try{
        const saved =await recentlyPlayed.save();
        res.status(200).json(saved);
    }catch(err){
        res.status(500).json("internal server error");
    }
})

// UDPATE RECENTLY PLAYED
router.put('/',verify,async(req,res,next)=>{
    const userId = req.body.userId;
    const movieId = req.body.movieId;
    const timeStamp = req.body.timeStamp;
    try{
        const result = await RecentlyPlayed.findOneAndUpdate({
            userId:userId,
            movieId:movieId
        },{
            timeStamp:timeStamp
        })
        res.status(200).json(result);
    }catch(err){
        res.status(500).json("internal server error");
    }
})

module.exports = router;