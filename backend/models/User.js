const mongoose=require("mongoose");
const userSchema=new mongoose.Schema(
    {
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:""},
    isAdmin:{type:Boolean,default:false},
    active:{type:Boolean,default:false},
    screens:{type:Number,default:0},
    newUser:{type:Boolean,default:true},
    pid:{type:Number,default:0},
    resetToken:{type:String},
    resetTokenExpiration:{type:Date},
    },
    {timestamps:true}
);





module.exports=mongoose.model("User",userSchema);