const router=require("express").Router();
const Movie=require("../models/Movie");
const verify=require("../verifyToken");

//CREATE

router.post("/",verify,async (req,res)=>{
    if(req.user.isAdmin){
        const newMovie=new Movie(req.body);

        try{
            const savedMovie=await newMovie.save();
            res.status(201).json(savedMovie);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("Not allowed");
    }
})

//UPDATE
router.put("/:id",verify,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            const updatedMovie=await Movie.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },
            {new:true}
            );

            res.status(200).json(updatedMovie);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("Not allowed");
    }
});

//DELETE
router.delete("/:id",verify,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie Deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("Not allowed");
    }
});

//GET
router.get("/find/:id",verify,async(req,res)=>{
    try{
        const movie=await Movie.findById(req.params.id);
        res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET RANDOM MOVIE
router.get("/random",verify,async (req,res)=>{
    const type=req.query.type;
    const genre = req.query.genre;
    let movie;
    try{
        if(type==="series"){
            movie=await Movie.aggregate([
                {$match:{isSeries:true}},
                {$sample:{size:1}},
            ]);
        }else{
            if(genre){
                movie=await Movie.aggregate([
                    {$match:{isSeries:false,genre:genre}},
                    {$sample:{size:1}},
                ]);
            }else{
                movie=await Movie.aggregate([
                    {$match:{isSeries:false}},
                    {$sample:{size:1}},
                ]);
            }
        }

        res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL
router.get("/",verify,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            const movies=await Movie.find().sort({title:1});
            res.status(200).json(movies); 
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("Not allowed");
    }
})

// SEARCH MOVIE
router.get('/search',verify,async(req,res,next)=>{
    const movie = req.query.searchMovie;
    const searchResult = await Movie.find({
        title:{$regex:movie,$options:'i'},
    })
    res.status(200).json(searchResult);
})

module.exports=router;