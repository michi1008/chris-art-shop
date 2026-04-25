import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Function to log environment variables for debugging
const logEnvVariables = () => {
  console.log("Email:", process.env.EMAIL);
  console.log("App Password:", process.env.PASSWORD_APP_EMAIL);
  console.log("JWT Secret:", process.env.JWT_SECRET);
};

const forgetPassword = asyncHandler(async (req, res) => {
  try {
    logEnvVariables();
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    // If user not found, send error message
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
      secure: true, // Use TLS
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true,
    });

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
        <p>Click on the following link to reset your password:</p>
        <a href="https://chris-art-shop.onrender.com/reset-password/${token}">https://chris-art-shop.onrender.com/reset-password/${token}</a>
        <p>The link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Email configuration
    /* const mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Reset Password",
          html: `<h1>Reset Your Password</h1>
            <p>Click on the following link to reset your password:</p>
            <a href="http://localhost:3000/reset-password/${token}">http://localhost:3000/reset-password/${token}</a>
            <p>The link will expire in 10 minutes.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>`,
        }; */

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent" });
  } catch (err) {
    console.error("Error in forgetPassword:", err);
    res.status(500).send({ message: err.message });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    // Verify token
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    );

    // Find user
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).send({ message: "No user found" });
    }

    // Assign plain-text password — userModel pre('save') hook handles hashing
    user.password = req.body.newPassword;

    // Save to DB (IMPORTANT CHANGE)
    await user.save();

    res.status(200).send({ message: "Password updated" });

  } catch (err) {
    // Better error handling for expired/invalid token
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token expired" });
    }

    res.status(500).send({ message: err.message });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  forgetPassword,
  resetPassword
};
