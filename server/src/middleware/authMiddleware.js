import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    try {
      // Get token from cookie
      /*
      // OLD AUTH IMPLEMENTATION:
      // token = req.headers.authorization.split(' ')[1];
      // Read token from Authorization header. Replaced with HttpOnly cookie.
      */
      token = req.cookies.token;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (select excludes password, although our model already strips it in toJSON, it's good practice here too)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};
