const express = require('express');
const router = express.Router();
const Package = require('../models/packages');
const stripe = require('stripe')('sk_test_51OzCkBSBx2YpACrt9klfELXtiUnemMTV0F4d0uZqxkvlvz6Tgo0dv1Mq34WVpA9l7jNtijiIyF48xSTWheD1kufD00VHFIZQXD');

router.post('/',async (req,res,next)=>{
    const pid = req.body.pid;
    const screens = req.body.screens;
    const price = req.body.price;
    const maxRes = req.body.maxRes;
    const name = req.body.name;
    try{
        const package = new Package({
            pid:pid,
            screens:screens,
            price:price,
            maxRes:maxRes,
            name:name
        })
    
        await package.save();
        res.status(201).json({
            message:'Package created',
            package:package
        })
    }catch(err){
        console.log(err);
    }
})

//GET PACKAGE
router.get('/:pid',async (req,res,next)=>{
    const pid = req.params.pid;
    const package = await Package.find({pid:pid});
    res.status(200).json({result:package[0]});
})

//GET PLAN
router.post('/checkout', async (req,res,next)=>{
    const pid = req.body.pid;
    const package = (await Package.find({pid:pid}))[0];
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            line_items :[{
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name:package.name,
                            description:package.screens,
                        },
                        unit_amount:package.price * 100,
                    },
                    quantity:1
                }],
            customer_email:req.body.email,
            mode:'payment',
            success_url:'https://netflixify.vercel.app/paymentSuccess',
            cancel_url:'https://netflixify.vercel.app/paymentCancel',    
            // success_url:'http://localhost:3001/paymentSuccess',
            // cancel_url:'http://localhost:3001/paymentCancel',   
        });
        res.status(200).json({id:session.id});
    }catch(err){
        console.log(err);
        res.status(500).json({message:err});
    }
})

module.exports=router;