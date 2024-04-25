const router=require("express").Router();
const User=require("../models/User");
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.AUTH_KEY
    }
})


//REGISTER
router.post("/register", async (req,res)=>{
    const username = req.body.username
    const email=req.body.email;
    const password = req.body.password

    const newUser=new User({
        username:username,
        email:email,
        password:CryptoJS.AES.encrypt(password,process.env.SECRET_KEY).toString(),
    });
    // console.log(newUser);
    try{
        const user=await newUser.save();
        await transporter.sendMail({
            to:email,
            from:process.env.EMAIL,
            subject:'Successful Sign Up',
            html:'<h1> Successfully created an account</h1>'
        })
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

//login
router.post("/login", async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        !user && res.status(401).json("Wrong Username");

        const originalpass=CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        if(originalpass!==req.body.password){
            return res.status(401).json("Wrong Password");
        }
        const accessToken=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY,{expiresIn:"12h"});

        const {password, ...info}=user._doc;

        res.status(200).json({...info,accessToken});
    }catch(err){
        res.status(500).json(err);
    }
})

//FORGOT PASSWORD
router.post('/forgotPassword',async(req,res,next)=>{
    const email = req.body.email;
    try{
        crypto.randomBytes(32,async(err,buffer)=>{
            if(err){
                res.status(500).json(err);
            }else{
                const token = buffer.toString('hex');
                const user = await User.findOne({email:email});
                user.resetToken = token;
                user.resetTokenExpiration = String(Date.now() + 3600000);
                user.save();
                transporter.sendMail({
                    to:email,
                    from:process.env.EMAIL,
                    subject:'RESET PASSWORD',
                    // html:`<h1>You have requested for password reset </h1>   <p> To reset <a href="http://localhost:3001/newPassword/${token}">click here</a> </p>`
                    html:`<h1>You have requested for password reset </h1><p> To reset <a href="https://netflixify.vercel.app/newPassword/${token}">click here</a> </p>`
                })
            }
        })
        res.status(200).json({message:'Success'});
    }catch(err){
        res.status(500).json(err);
    }
})


// NEW PASSWORD
router.post('/newPassword',async (req,res,next)=>{
    const password = req.body.password;
    const token = req.body.token;
    const hashedPassword = CryptoJS.AES.encrypt(password,process.env.SECRET_KEY).toString();
    try{
        await User.findOneAndUpdate({resetToken:token},{
            password:hashedPassword
        })
        res.status(201).json({message:'success'})
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;