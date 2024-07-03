import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, picture } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    userName,
    email,
    password,
    picture,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { userName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const updateProfilePicture = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log(req.file);

  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const profilePicture = req.file.location;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { picture: profilePicture },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.status(200).json(updatedUser);
  }
});

export { registerUser, authUser, allUsers, updateProfilePicture };
