const mongoose=require("mongoose")
const ExerciseSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now }
});
const UserSchema= new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    exerciseLists: [ExerciseSchema],
    dateCreated: { type: Date, default: Date.now },
})

const UserModel= mongoose.model("User",UserSchema)
module.exports= UserModel