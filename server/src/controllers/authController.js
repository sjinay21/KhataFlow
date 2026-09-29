import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate request
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    if (password.trim().length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters');
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    if (user) {
      /*
      // OLD AUTH IMPLEMENTATION:
      // JWT was stored in localStorage, which allowed JavaScript to access
      // the authentication token.
      // Replaced with HttpOnly cookie authentication so the JWT is not
      // directly accessible to frontend JavaScript.
      res.status(201).json({
        user,
        token: generateToken(user._id),
      });
      */
      setTokenCookie(res, generateToken(user._id));
      res.status(201).json({
        user, // userSchema.methods.toJSON strips the password automatically
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate a user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check for user email
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    /*
    // OLD AUTH IMPLEMENTATION:
    // JWT was returned to frontend for localStorage storage.
    res.json({
      user,
      token: generateToken(user._id),
    });
    */
    setTokenCookie(res, generateToken(user._id));
    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    res.json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/v1/auth/logout
 * @access  Public
 */
export const logoutUser = (req, res) => {
  /*
  // OLD AUTH IMPLEMENTATION:
  // With localStorage, token destruction happens on the client.
  // We just return a success response here.
  */
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: 'Logged out successfully' });
};
