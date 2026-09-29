# Phase 3 Database User Model

## 1. Mongoose Schema
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: 6
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

## 2. Security Note
<!-- OLD CODE: Passwords will be securely hashed with `bcrypt` before saving. Hashes must be excluded when returning user data to the frontend.
Reason for change: Owner approved bcryptjs. -->
Passwords will be securely hashed with `bcryptjs` before saving. Hashes must be excluded when returning user data to the frontend.
