const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const dbConfig=require("./configs/db.configs")
const portConfig=require("./configs/server.config")
const User=require("./models/user.models")
const healthTracker=require("./models/healthTracker.models")
const constants=require("./utils/constant")

mongoose.connect(dbConfig.DB_URL)

const db=mongoose.connection;
db.on("err",()=>{
    console.log("Error while connecting to DB")
});
db.once("open",()=>{
    console.log("Connected.....")
    init();
})
async function init()
{
    try
    {
        await User.collection.drop()
        await healthTracker.collection.drop();
        const user=await User.create({
            name:"sandeep",
            userId:"sam",
            address:"jay prakash nagar",
            email:"san@gmail.com",
            password:bcrypt.hashSync("Welcome",8),
            userType:"ADMIN",
            userStatus:"APPROVED"
        })
       
        const health=await healthTracker.create({
            height:"5.54",
            weight:"50kg",
            bloodPressure:110,
            sugarLevel:150,
            temperature:34,
            userId:user._id 
        })
        const health1=await healthTracker.create({
            height:"5.54",
            weight:"50kg",
            bloodPressure:110,
            sugarLevel:150,
            temperature:34,
            userId:user._id 
        })
        user.healthTracker.push(health._id,health1._id)
        await user.save()
        console.log(user)
        console.log(health)
        console.log(health1)
    }catch(err)
    {
        console.log("Error while connecting to DB",err.message)
    }
}

require("./routes/auth.routes")(app)
require("./routes/healthTrack")(app)
app.listen(portConfig.PORT,()=>{
    console.log("Connected to PORT...",portConfig.PORT)
})