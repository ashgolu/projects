const mongoose = require("mongoose")
// list of exercises
const ExerciseSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now }
});

// Each exercise data
const ExerciseDataSchema = new mongoose.Schema({
    date: { type: String, required: true },
    exercises: [
        {
            name: { type: String, required: true },
            time: { type: Number },
            weights: { type: Number },
            reps: { type: Number },
            sets: { type: Number },
            distance: { type: Number }
        }]
}, { timestamps: true });




const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    exerciseLists: [ExerciseSchema],
    exerciseData: [ExerciseDataSchema],
    dateCreated: { type: Date, default: Date.now },
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel


