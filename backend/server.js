require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json()); //it looks for the body in the post request and parses it so we can acces it later on from the req
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes); //when we go to this path use this router

// listen for requests
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
