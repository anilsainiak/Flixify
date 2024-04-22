const express=require("express");
const app=express();
const mongoose=require("mongoose");
const  dotenv=require("dotenv");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const moviesRoute=require("./routes/movies");
const listsRoute=require("./routes/lists");
const packageRoute = require('./routes/package');
const recentlyPlayedRoute = require('./routes/recentlyPlayed');
var cors = require('cors')

app.use(cors())

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
});

app.use(express.json());


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movie",moviesRoute);
app.use("/api/lists",listsRoute);
app.use('/api/package',packageRoute);
app.use('/api/recentlyPlayed',recentlyPlayedRoute);


app.listen(8800,()=>{
    console.log("server running");
})