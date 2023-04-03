const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  //three args : 1st => payload object nothing sensitive, 2nd => secret only know to server, 3rd => options
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ msg: "Successfully logged in", token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await User.signup(email, password, name);

    //create token
    const token = createToken(user._id);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { loginUser, signupUser };
