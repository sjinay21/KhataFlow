import Goal from '../models/Goal.js';
import mongoose from 'mongoose';

// @desc    Get all goals for user
// @route   GET /goals
// @access  Private
export const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single goal
// @route   GET /goals/:id
// @access  Private
export const getGoalById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid goal ID' });
    }

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Check ownership
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(goal);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a goal
// @route   POST /goals
// @access  Private
export const createGoal = async (req, res, next) => {
  try {
    const { title, targetAmount, currentAmount, targetDate, description } = req.body;

    if (!title || !targetAmount) {
      return res.status(400).json({ message: 'Please provide title and target amount' });
    }

    if (targetAmount < 1) {
      return res.status(400).json({ message: 'Target amount must be at least 1' });
    }

    if (currentAmount !== undefined && currentAmount < 0) {
      return res.status(400).json({ message: 'Current amount cannot be negative' });
    }

    const goal = await Goal.create({
      user: req.user.id,
      title: title.trim(),
      targetAmount,
      currentAmount: currentAmount || 0,
      targetDate: targetDate ? new Date(targetDate) : undefined,
      description: description ? description.trim() : undefined,
      status: (currentAmount || 0) >= targetAmount ? 'completed' : 'active'
    });

    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a goal
// @route   PUT /goals/:id
// @access  Private
export const updateGoal = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid goal ID' });
    }

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Check ownership
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, targetAmount, currentAmount, targetDate, description, status } = req.body;

    if (targetAmount !== undefined && targetAmount < 1) {
      return res.status(400).json({ message: 'Target amount must be at least 1' });
    }

    if (currentAmount !== undefined && currentAmount < 0) {
      return res.status(400).json({ message: 'Current amount cannot be negative' });
    }

    if (title) goal.title = title.trim();
    if (targetAmount !== undefined) goal.targetAmount = targetAmount;
    if (currentAmount !== undefined) goal.currentAmount = currentAmount;
    if (targetDate !== undefined) goal.targetDate = targetDate ? new Date(targetDate) : undefined;
    if (description !== undefined) goal.description = description.trim();
    
    // Auto-complete if amount reached, unless manually forced to active
    if (goal.currentAmount >= goal.targetAmount) {
      goal.status = 'completed';
    } else {
      // If amount dropped below target, but user forced status to completed, respect manual status, otherwise revert to active
      goal.status = status || 'active';
    }

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a goal
// @route   DELETE /goals/:id
// @access  Private
export const deleteGoal = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid goal ID' });
    }

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Check ownership
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await goal.deleteOne();
    res.json({ message: 'Goal removed' });
  } catch (error) {
    next(error);
  }
};
