'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getGoals, createGoal, updateGoal, deleteGoal } from '@/lib/api';

import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import GoalList from '@/components/goals/GoalList';
import GoalForm from '@/components/goals/GoalForm';

export default function GoalsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Selected goal tracking
  const [selectedGoal, setSelectedGoal] = useState(null);
  
  // Feedback state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear feedback after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const fetchGoals = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await getGoals();
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
    } catch (err) {
      setError('Could not load goals.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchGoals();
  }, [fetchGoals, user]);

  // Handlers for Adding
  const handleAddClick = () => {
    setSelectedGoal(null);
    setIsFormOpen(true);
  };

  // Handlers for Editing
  const handleEditClick = (goal) => {
    setSelectedGoal(goal);
    setIsFormOpen(true);
  };

  // Handlers for Deleting
  const handleDeleteClick = (goal) => {
    setSelectedGoal(goal);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      let response;
      if (selectedGoal) {
        response = await updateGoal(selectedGoal._id, formData);
      } else {
        response = await createGoal(formData);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save goal');
      }

      await fetchGoals();
      setSuccess(`Goal successfully ${selectedGoal ? 'updated' : 'added'}!`);
      setIsFormOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedGoal) return;
    setIsSubmitting(true);
    setError('');

    try {
      const response = await deleteGoal(selectedGoal._id);
      if (!response.ok) throw new Error('Failed to delete goal');
      
      await fetchGoals();
      setSuccess('Goal deleted successfully.');
      setIsDeleteOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl text-slate-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Feedback Banners */}
      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md border border-red-100 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md border border-green-100 text-sm">
          {success}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financial Goals</h1>
          <p className="text-slate-500 mt-1">Track your progress toward important milestones.</p>
        </div>
        <Button onClick={handleAddClick} variant="primary">
          + Add Goal
        </Button>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="py-12 text-center text-slate-500 animate-pulse">
          Loading goals...
        </div>
      ) : (
        <GoalList 
          goals={goals} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteClick} 
        />
      )}

      {/* Form Modal */}
      <Modal 
        isOpen={isFormOpen} 
        onClose={() => !isSubmitting && setIsFormOpen(false)}
        title={selectedGoal ? "Edit Goal" : "Add New Goal"}
      >
        <GoalForm 
          initialData={selectedGoal} 
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
          loading={isSubmitting}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteOpen} 
        onClose={() => !isSubmitting && setIsDeleteOpen(false)}
        title="Delete Goal"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete} disabled={isSubmitting}>
              {isSubmitting ? 'Deleting...' : 'Delete Goal'}
            </Button>
          </>
        }
      >
        <p className="text-slate-600">
          Are you sure you want to delete the goal <strong>{selectedGoal?.title}</strong>? 
          This action cannot be undone.
        </p>
      </Modal>

    </div>
  );
}
