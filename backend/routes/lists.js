const router=require("express").Router();
const verify=require("../verifyToken");
const List=require("../models/List");

//CREATE
router.post("/",verify,async (req,res)=>{
    if(req.user.isAdmin){
        const newList=new List(req.body);
        try{
            const savedList=await newList.save();
            res.status(200).json(savedList);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("Not allowed");
    }
})

//DELETE
router.delete("/:id",verify,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("List Deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("Not allowed");
    }
});

//GET LIST
router.get("/",verify,async (req,res)=>{
    const typeQuery=req.query.type;
    const genreQuery=req.query.genre;
    let list=[];

    try{
        if(typeQuery){
            if(genreQuery){
                list=await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery,genre:genreQuery}},
                ]);
            }else{
                list=await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery}},
                ]);
            }
        }else{
            if(genreQuery){
                list=await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{genre:genreQuery}}
                ])
            }else{
                list=await List.aggregate([{$sample:{size:10}}]);
            }
        }
        res.status(200).json(list);
    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL
router.get("/getAll",verify,async (req,res)=>{
    try{
        const list = await List.find();
        res.status(200).json(list);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put('/:id',verify,async (req,res,next)=>{
    if(req.user.isAdmin){
        try{
            const updatedList = await List.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },
            {new:true});
            res.status(200).json(updatedList);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("not allowed");
    }
})

module.exports=router;