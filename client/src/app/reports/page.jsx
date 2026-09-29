'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getExpenseReports } from '@/lib/api';

import ReportFilters from '@/components/reports/ReportFilters';
import ReportSummary from '@/components/reports/ReportSummary';
import CategoryBreakdown from '@/components/reports/CategoryBreakdown';
import PaymentMethodBreakdown from '@/components/reports/PaymentMethodBreakdown';
import SpendingTrend from '@/components/reports/SpendingTrend';

export default function ReportsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [preset, setPreset] = useState('this_month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Handle Preset Changes
  useEffect(() => {
    if (preset === 'custom') return;
    
    const today = new Date();
    let start, end;

    if (preset === 'this_month') {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (preset === 'last_month') {
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      end = new Date(today.getFullYear(), today.getMonth(), 0);
    } else if (preset === 'last_3_months') {
      start = new Date(today.getFullYear(), today.getMonth() - 3, 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }

    if (start && end) {
      // Fix timezone shifting by using local components for YYYY-MM-DD
      const formatLocal = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };

      setStartDate(formatLocal(start));
      setEndDate(formatLocal(end));
    }
  }, [preset]);

  const fetchReports = useCallback(async () => {
    if (!user) return;
    if (!startDate && !endDate && preset === 'custom') return;

    setLoading(true);
    setError('');

    try {
      const response = await getExpenseReports({ startDate, endDate });

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError('Could not load reports. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user, startDate, endDate, preset]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && (startDate || endDate)) {
      fetchReports();
    }
  }, [fetchReports, user, startDate, endDate]);

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-slate-500 mt-1">Understand your spending patterns.</p>
      </div>

      <ReportFilters 
        preset={preset}
        setPreset={setPreset}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500 animate-pulse">
          Analyzing expenses...
        </div>
      ) : reportData && reportData.summary.totalExpenses === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center">
          <h3 className="text-lg font-medium text-slate-800 mb-2">No expenses found</h3>
          <p className="text-slate-500">There are no expense records for the selected time period.</p>
        </div>
      ) : reportData ? (
        <div className="space-y-6">
          <ReportSummary summary={reportData.summary} />
          
          <SpendingTrend data={reportData.spendingTrend} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryBreakdown data={reportData.categoryBreakdown} />
            <PaymentMethodBreakdown data={reportData.paymentMethodBreakdown} />
          </div>
        </div>
      ) : null}

    </div>
  );
}
