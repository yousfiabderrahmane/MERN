const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// 1-get all workouts

const getWorkouts = async (req, res) => {
  // say we want only does with 20 reps, we do it like that workout.find({reps: 20})
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); // descending order
  res.status(200).json(workouts);
};

// 2-get a single workout

const getWorkout = async (req, res) => {
  const { id } = req.params;

  //check if the id is of type 12 integer or 24 hex integers (or else mongoose throws error if we put a random id in the request)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "No such workout my dude" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res
      .status(400)
      .json({ msg: `Could not find workout with id of ${id}` });
  } //we use return so it doesn carry on the rest of the code
  res.status(200).json({ workout });
};

// 3-create a new workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  //add doc to db
  try {
    const newWorkout = await Workout.create({ title, load, reps });
    res.status(200).json({ newWorkout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 4-delete a workout

// 5-update a workout

module.exports = { createWorkout, getWorkouts, getWorkout };
