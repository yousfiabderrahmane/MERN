require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const workoutRoutes = require("./routes/workouts");

// env variables
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
// express app
const app = express();

// middleware
app.use(express.json()); //it looks for the body in the post request and parses it so we can acces it later on from the req
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes); //when we go to this path use this router

//connect to db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // listen for requests after connection to db
    app.listen(PORT, () => {
      console.log(`Connected to db, Now listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
