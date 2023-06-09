const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async (email, password, name) => {
  //validation
  if (!email || !password || !name) {
    throw Error("All fields must be filled");
  }
  //check if email is really an email
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  //check if password if strong
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await User.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({ email, password: hash, name });

  return user;
};

// static login method
userSchema.statics.login = async (email, password) => {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await User.findOne({ email }); //declarinaha lte7t o khdama hnaya because of scopin or hoisting i guess

  if (!user) {
    throw Error("Incorrect email");
  }

  //the password we passing as an arg + the password existing in the user object
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
