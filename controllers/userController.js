const User = require("../models/usersModel");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKEN_KEY } = process.env;

require("dotenv").config();

exports.Register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bycript.hash(password, 10);
    const user = new User({
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
    });
    const newUser = await user.save();

    res.status(201).json({
      _id: user._id,
      username: user.username,
      friends: user.friends,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// ! the procces of login logic
exports.Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({
      username: req.body.username.toLowerCase(),
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bycript.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password or email not match" });
    }
    const token = jwt.sign({ _id: user._id }, TOKEN_KEY, { expiresIn: "1d" });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      _id: user._id,
      token: token,
      username: user.username,
      friends: user.friends,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

// ! get user by its id
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the post in the database by its ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If the post is found, send it as a response
    res.status(200).json(user);
  } catch (error) {
    // If there's any error while fetching the post, return a 500 error
    res
      .status(500)
      .json({ error: "An error occurred while fetching the post" });
  }
};
// ! get all users without passwords
exports.getUsers = async (req, res) => {
  try {
    // Use projection to exclude the password field
    const users = await User.find({}, { password: 0 });
    // console.log(users);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};

//! edit a user by id

exports.updateUserByID = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const update = { name, email };

  try {
    const user = await User.findByIdAndUpdate(id, update);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
  // follow user by id
};

// upoload image of user

// Set storage engine for multer
