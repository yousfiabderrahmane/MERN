const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// what should a typical workout object look like
const WorkoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema); //singular cause it will pluralise it to create a 'Workouts' collection for us

//to use it : example : Workout.find() ....
