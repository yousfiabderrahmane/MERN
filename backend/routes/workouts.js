const express = require("express");
const router = express.Router();

// GET all workouts
router.get("/", (req, res) => {
  res.json({ msg: "Get all workouts" });
});

// GET a single workout
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json({ msg: `GET workout with id of ${id}` });
});

// POST a new workout
router.post("/", (req, res) => {
  res.json({ msg: "POST request made" });
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
