import Expense from '../models/Expense.js';
import mongoose from 'mongoose';

// @desc    Create a new expense
// @route   POST /api/v1/expenses
// @access  Private
export const createExpense = async (req, res, next) => {
  try {
    const { amount, category, description, date, paymentMethod, notes } = req.body;

    const expense = await Expense.create({
      user: req.user.id,
      amount,
      category,
      description,
      date,
      paymentMethod,
      notes
    });

    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all expenses for the logged-in user
// @route   GET /api/v1/expenses
// @access  Private
export const getExpenses = async (req, res, next) => {
  try {
    /*
    Previous implementation:
    const { category, paymentMethod, startDate, endDate, sort } = req.query;

    const query = { user: req.user.id };

    if (category) {
      query.category = category;
    }

    if (paymentMethod) {
      query.paymentMethod = paymentMethod;
    }

    Changed because: Added support for 'search' query parameter for Phase 5 correction.
    */
    const { category, paymentMethod, startDate, endDate, sort, search } = req.query;

    const query = { user: req.user.id };

    if (search) {
      query.description = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (paymentMethod) {
      query.paymentMethod = paymentMethod;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    let sortOptions = { date: -1, createdAt: -1 }; // Default: Newest first
    if (sort === 'oldest') {
      sortOptions = { date: 1, createdAt: 1 };
    } else if (sort === 'highest') {
      sortOptions = { amount: -1 };
    } else if (sort === 'lowest') {
      sortOptions = { amount: 1 };
    }

    const expenses = await Expense.find(query).sort(sortOptions);

    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single expense by ID
// @route   GET /api/v1/expenses/:id
// @access  Private
export const getExpenseById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error('Invalid expense ID format');
    }

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found or unauthorized');
    }

    res.json(expense);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an expense
// @route   PUT /api/v1/expenses/:id
// @access  Private
export const updateExpense = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error('Invalid expense ID format');
    }

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found or unauthorized');
    }

    const { amount, category, description, date, paymentMethod, notes } = req.body;

    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.description = description ?? expense.description;
    expense.date = date ?? expense.date;
    expense.paymentMethod = paymentMethod ?? expense.paymentMethod;
    expense.notes = notes ?? expense.notes;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an expense
// @route   DELETE /api/v1/expenses/:id
// @access  Private
export const deleteExpense = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error('Invalid expense ID format');
    }

    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found or unauthorized');
    }

    res.json({ message: 'Expense removed' });
  } catch (error) {
    next(error);
  }
};
