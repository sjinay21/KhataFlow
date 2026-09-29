import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 1
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  targetDate: {
    type: Date
  },
  description: {
    type: String,
    maxLength: 200
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  }
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;
