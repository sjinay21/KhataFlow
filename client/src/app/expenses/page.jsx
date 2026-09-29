'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ExpenseList from '@/components/expenses/ExpenseList';
import ExpenseSummary from '@/components/expenses/ExpenseSummary';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import { getExpenses, deleteExpense } from '@/lib/api';

const CATEGORIES = [
  'All', 'Food', 'Groceries', 'Rent', 'EMI', 'Utilities', 
  'Transport', 'Shopping', 'Entertainment', 'Health', 
  'Education', 'Family', 'Bills', 'Travel', 'Other'
];

const PAYMENT_METHODS = [
  'All', 'Cash', 'UPI', 'Debit Card', 'Credit Card', 'Bank Transfer', 'Other'
];

export default function ExpensesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  
  // Filter/Sort states
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('All');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  const fetchExpenses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    /*
    Previous implementation:
    try {
      const token = localStorage.getItem('token');
      let url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/expenses?sort=${sortOrder}`;
      
      if (categoryFilter !== 'All') {
        url += `&category=${categoryFilter}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError('Could not load expenses. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }

    Changed because: Refactored to use central api.js helper functions.
    */
    /*
    Previous implementation:
    try {
      const response = await getExpenses(sortOrder, categoryFilter);

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError('Could not load expenses. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }

    Changed because: Phase 5 correction to pass new filter states.
    */
    try {
      const response = await getExpenses({
        sort: sortOrder,
        category: categoryFilter,
        paymentMethod: paymentMethodFilter,
        startDate: startDateFilter,
        endDate: endDateFilter,
        search: searchQuery
      });

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError('Could not load expenses. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user, categoryFilter, sortOrder, paymentMethodFilter, startDateFilter, endDateFilter, searchQuery]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [fetchExpenses, user]);

  const handleOpenAddForm = () => {
    setExpenseToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditForm = (expense) => {
    setExpenseToEdit(expense);
    setIsFormModalOpen(true);
  };

  const handleFormSave = () => {
    setIsFormModalOpen(false);
    fetchExpenses(); // Refresh the list
  };

  const confirmDelete = (expense) => {
    setExpenseToDelete(expense);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!expenseToDelete) return;
    
    /*
    Previous implementation:
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/expenses/${expenseToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      
      setIsDeleteModalOpen(false);
      fetchExpenses();
    } catch (err) {
      alert(err.message);
    }

    Changed because: Refactored to use central api.js helper functions.
    */
    try {
      const response = await deleteExpense(expenseToDelete._id);

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      
      setIsDeleteModalOpen(false);
      fetchExpenses();
    } catch (err) {
      /*
      Old implementation:
      alert(err.message);
      
      Reason for replacement:
      Using native browser alerts creates a jarring UX.
      Replaced with local inline error state.
      */
      setError(err.message);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl text-slate-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) return null; // Handled by useEffect redirect

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Expenses</h1>
          <p className="text-slate-500 mt-1">Track where your money actually goes.</p>
        </div>
        <Button onClick={handleOpenAddForm} variant="primary">
          + Add Expense
        </Button>
      </div>

      {/* Summary Area */}
      {!loading && !error && expenses.length > 0 && (
        <ExpenseSummary expenses={expenses} />
      )}

      {/* Filters Area */}
      {/*
      Previous implementation:
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Filter by Category</label>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full border border-slate-300 rounded-md p-2 text-sm"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Sort By</label>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="block w-full border border-slate-300 rounded-md p-2 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      Changed because: Phase 5 correction to include search, payment method, start date, and end date inputs.
      */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Search Description</label>
            <input 
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full border border-slate-300 rounded-md p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Category</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full border border-slate-300 rounded-md p-2 text-sm"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Payment Method</label>
            <select 
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="block w-full border border-slate-300 rounded-md p-2 text-sm"
            >
              {PAYMENT_METHODS.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Start Date</label>
            <input 
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              className="block w-full border border-slate-300 rounded-md p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">End Date</label>
            <input 
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              className="block w-full border border-slate-300 rounded-md p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Sort By</label>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="block w-full border border-slate-300 rounded-md p-2 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>
        
        {/* Clear Filters Button */}
        {(searchQuery || categoryFilter !== 'All' || paymentMethodFilter !== 'All' || startDateFilter || endDateFilter) && (
          <div className="flex justify-end pt-2 border-t border-slate-100 mt-2">
            <button 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('All');
                setPaymentMethodFilter('All');
                setStartDateFilter('');
                setEndDateFilter('');
                setSortOrder('newest');
              }}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500 animate-pulse">
          Loading expenses...
        </div>
      ) : (
        <ExpenseList 
          expenses={expenses} 
          onEdit={handleOpenEditForm}
          onDelete={confirmDelete}
        />
      )}

      {/* Modals */}
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)}
        title={expenseToEdit ? 'Edit Expense' : 'Add Expense'}
      >
        <ExpenseForm 
          expense={expenseToEdit} 
          onSave={handleFormSave}
          onCancel={() => setIsFormModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Expense"
      >
        <div className="space-y-4">
          <p className="text-slate-600">Are you sure you want to delete this expense? This action cannot be undone.</p>
          {expenseToDelete && (
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <p className="font-medium">{expenseToDelete.description}</p>
              <p className="text-sm text-slate-500">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(expenseToDelete.amount)}</p>
            </div>
          )}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
