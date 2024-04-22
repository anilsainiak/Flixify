const router = require("express").Router();
const verify = require("../verifyToken");
const List = require("../models/List");
const RecentlyPlayed = require('../models/recentlyPlayed');
const fs = require('fs');
const { spawn } = require('child_process');
const Movie = require("../models/Movie");

//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(200).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not allowed");
    }
})

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("List Deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not allowed");
    }
});

//GET LIST
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $match: { type: typeQuery, genre: genreQuery } },
                    { $sample: { size: 10 } },
                ]);
            } else {
                list = await List.aggregate([
                    { $match: { type: typeQuery } },
                    { $sample: { size: 10 } },
                ]);
            }
        } else {
            if (genreQuery) {
                list = await List.aggregate([
                    { $match: { genre: genreQuery } },
                    { $sample: { size: 10 } },
                ])
            } else {
                list = await List.aggregate([
                    {$match:{title:{$regex:'Best',$options:'i'}}},
                    { $sample: { size: 10 } }
                ]);
            }
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL
router.get("/getAll", verify, async (req, res) => {
    try {
        const list = await List.find();
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE
router.put('/:id', verify, async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const updatedList = await List.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
                { new: true });
            res.status(200).json(updatedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("not allowed");
    }
})


// RECENTLY PLAYED
router.get('/recentlyPlayed', verify, async (req, res, next) => {
    const userId = req.query.userId;
    const result = {
        title: "Continue Watching",
        content: []
    }
    try {
        const response = await RecentlyPlayed.find({ userId: userId }).sort({ updatedAt: -1 }).limit(10);
        if(response.length===0){
            return res.status(404).json('new User');
        }
        response.map(item => {
            result.content.push(item.movieId)
        })
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
})

// RECOMMENDED MOVIES
router.get('/recommended', verify, async (req, res, next) => {
    const movie = req.query.movie;
    console.log(movie);
    const movies = await Movie.find();
    let result = {content:[],title:"Recommended for you"};
    const moviesList = movies.map(movie => {
        return {title:movie.title,id:movie._id}
    })

    try {
        const pythonProcess = spawn('python', ['./util/model.py', movie]);
        pythonProcess.on('close', () => {
            const recommendations = fs.readFileSync('./util/recommendations.txt', 'utf8').replace(/\r/g, '').split('\n').filter(Boolean);
            moviesList.forEach(item => {
                if (recommendations.includes(item.title.toLowerCase())) {
                    result.content.push(item.id);
                }
                if (result.content.length === 9) {
                    return;
                }
            })
            res.status(200).json(result);
        })
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;