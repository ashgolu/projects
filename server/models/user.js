const mongoose=require("mongoose")
const UserSchema= new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    exerciseLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseList' }],
    dateCreated: { type: Date, default: Date.now },
})

const UserModel= mongoose.model("User",UserSchema)
module.exports= UserModel