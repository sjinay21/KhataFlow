import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Food',
      'Groceries',
      'Rent',
      'EMI',
      'Utilities',
      'Transport',
      'Shopping',
      'Entertainment',
      'Health',
      'Education',
      'Family',
      'Bills',
      'Travel',
      'Other'
    ]
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [100, 'Description cannot exceed 100 characters']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: [
      'Cash',
      'UPI',
      'Debit Card',
      'Credit Card',
      'Bank Transfer',
      'Other'
    ]
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    default: ''
  }
}, {
  timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
