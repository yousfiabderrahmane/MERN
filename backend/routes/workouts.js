const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");

// GET all workouts
router.get("/", async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

// GET a single workout
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json({ msg: `GET workout with id of ${id}` });
});

// POST a new workout
router.post("/", async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const newWorkout = await Workout.create({ title, load, reps });
    res.status(200).json({ newWorkout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a workout
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json({ msg: `DELETE workout with id of ${id}` });
});

// UPDATE a workout
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json({ msg: `PATCHED workout with id of ${id}` });
});

// export router to use it
module.exports = router;
