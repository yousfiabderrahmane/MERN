require("dotenv").config();
const express = require("express");

// express app
const app = express();
const PORT = process.env.PORT;

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/", (req, res) => {
  res.json({ msg: "welcome to the app" });
});

// listen for requests
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
