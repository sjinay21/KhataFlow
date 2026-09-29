import Expense from '../models/Expense.js';

// @desc    Get expense report analytics
// @route   GET /reports/expenses
// @access  Private
export const getExpenseReports = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const query = { user: req.user.id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(query).sort({ date: 1 }); // Oldest to newest for trend calculation

    // Calculate Summary Stats
    const totalExpenses = expenses.length;
    let totalSpending = 0;
    let highestExpense = 0;
    let lowestExpense = totalExpenses > 0 ? Infinity : 0;

    const categoryMap = {};
    const paymentMethodMap = {};
    
    // For spending trend, let's just group by date (YYYY-MM-DD format is fine for this scale)
    const trendMap = {};

    expenses.forEach((exp) => {
      totalSpending += exp.amount;
      if (exp.amount > highestExpense) highestExpense = exp.amount;
      if (exp.amount < lowestExpense) lowestExpense = exp.amount;

      // Categories
      if (!categoryMap[exp.category]) categoryMap[exp.category] = 0;
      categoryMap[exp.category] += exp.amount;

      // Payment Methods
      if (!paymentMethodMap[exp.paymentMethod]) paymentMethodMap[exp.paymentMethod] = 0;
      paymentMethodMap[exp.paymentMethod] += exp.amount;

      // Trends
      const dateStr = exp.date.toISOString().split('T')[0];
      if (!trendMap[dateStr]) trendMap[dateStr] = 0;
      trendMap[dateStr] += exp.amount;
    });

    const averageExpense = totalExpenses > 0 ? (totalSpending / totalExpenses) : 0;

    // Formatting category breakdown
    const categoryBreakdown = Object.keys(categoryMap).map(key => ({
      category: key,
      amount: categoryMap[key],
      percentage: totalSpending > 0 ? ((categoryMap[key] / totalSpending) * 100).toFixed(2) : 0
    })).sort((a, b) => b.amount - a.amount); // Sort by highest spending

    // Formatting payment method breakdown
    const paymentMethodBreakdown = Object.keys(paymentMethodMap).map(key => ({
      method: key,
      amount: paymentMethodMap[key]
    })).sort((a, b) => b.amount - a.amount);

    // Formatting trend breakdown
    const spendingTrend = Object.keys(trendMap).map(key => ({
      date: key,
      amount: trendMap[key]
    })); // Already sorted due to initial DB sort

    res.json({
      summary: {
        totalSpending,
        totalExpenses,
        averageExpense,
        highestExpense,
        lowestExpense
      },
      categoryBreakdown,
      paymentMethodBreakdown,
      spendingTrend
    });
  } catch (error) {
    next(error);
  }
};
