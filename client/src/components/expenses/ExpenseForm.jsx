'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { createExpense, updateExpense } from '@/lib/api';

const CATEGORIES = [
  'Food', 'Groceries', 'Rent', 'EMI', 'Utilities', 
  'Transport', 'Shopping', 'Entertainment', 'Health', 
  'Education', 'Family', 'Bills', 'Travel', 'Other'
];

const PAYMENT_METHODS = [
  'Cash', 'UPI', 'Debit Card', 'Credit Card', 'Bank Transfer', 'Other'
];

export default function ExpenseForm({ expense, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: CATEGORIES[0],
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: PAYMENT_METHODS[0],
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount || '',
        category: expense.category || CATEGORIES[0],
        description: expense.description || '',
        date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        paymentMethod: expense.paymentMethod || PAYMENT_METHODS[0],
        notes: expense.notes || ''
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    /*
    Previous implementation:
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in.');

      const url = expense 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/expenses/${expense._id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/expenses`;
      
      const method = expense ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save expense');
      }

      onSave(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    Changed because: Refactored to use central api.js helper functions.
    */
    try {
      const response = expense 
        ? await updateExpense(expense._id, formData)
        : await createExpense(formData);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save expense');
      }

      onSave(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700">Amount *</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
          className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Category *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Description *</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          maxLength="100"
          className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
          placeholder="e.g. Weekly groceries"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Payment Method *</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
        >
          {PAYMENT_METHODS.map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          maxLength="500"
          rows="2"
          className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2"
          placeholder="Any additional details..."
        ></textarea>
      </div>

      <div className="pt-4 flex justify-end space-x-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Expense'}
        </Button>
      </div>
    </form>
  );
}
