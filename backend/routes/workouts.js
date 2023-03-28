const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
} = require("../controllers/workoutController");

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

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
