const mongoose=require("mongoose")
const UserSchema= new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    token: String
})

const UserModel= mongoose.model("user",UserSchema)
module.exports= UserModel