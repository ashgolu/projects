const mongoose=require("mongoose");
const ExerciseListSchema= new mongoose.Schema({
    exercises: [{ type: String, required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateCreated: { type: Date, default: Date.now },
})
const ExerciseList = mongoose.model('ExerciseList', ExerciseListSchema);
module.exports = ExerciseList;