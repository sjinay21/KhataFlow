import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

export default function GoalForm({ initialData = null, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        targetAmount: initialData.targetAmount || '',
        currentAmount: initialData.currentAmount || 0,
        targetDate: initialData.targetDate ? initialData.targetDate.split('T')[0] : '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.targetAmount || formData.targetAmount <= 0) newErrors.targetAmount = 'Valid target amount is required';
    
    if (formData.currentAmount !== '' && formData.currentAmount < 0) {
      newErrors.currentAmount = 'Current amount cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...formData,
      targetAmount: Number(formData.targetAmount),
      currentAmount: formData.currentAmount === '' ? 0 : Number(formData.currentAmount)
    };

    if (!submitData.targetDate) {
      delete submitData.targetDate;
    }

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Goal Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.title ? 'border-red-500' : 'border-slate-300'}`}
          placeholder="e.g. Emergency Fund"
          maxLength={50}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="targetAmount" className="block text-sm font-medium text-slate-700 mb-1">Target Amount (₹)</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="1"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.targetAmount ? 'border-red-500' : 'border-slate-300'}`}
            placeholder="50000"
          />
          {errors.targetAmount && <p className="mt-1 text-sm text-red-500">{errors.targetAmount}</p>}
        </div>

        <div>
          <label htmlFor="currentAmount" className="block text-sm font-medium text-slate-700 mb-1">Current Amount (₹)</label>
          <input
            type="number"
            id="currentAmount"
            name="currentAmount"
            value={formData.currentAmount}
            onChange={handleChange}
            min="0"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.currentAmount ? 'border-red-500' : 'border-slate-300'}`}
            placeholder="0"
          />
          {errors.currentAmount && <p className="mt-1 text-sm text-red-500">{errors.currentAmount}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="targetDate" className="block text-sm font-medium text-slate-700 mb-1">Target Date (Optional)</label>
        <input
          type="date"
          id="targetDate"
          name="targetDate"
          value={formData.targetDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="2"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Brief notes about this goal..."
          maxLength={200}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update Goal' : 'Add Goal'}
        </Button>
      </div>
    </form>
  );
}
