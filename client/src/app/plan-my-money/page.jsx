'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';

export default function PlanMyMoneyIndex() {
  const { user, loading: authLoading } = useAuth();
  const { activePlan, fetchActivePlan, loading: planLoading } = usePlanMyMoney();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchActivePlan();
    }
  }, [user]);

  useEffect(() => {
    if (!planLoading && !authLoading && user) {
      if (activePlan) {
        router.push('/plan-my-money/plan');
      } else {
        router.push('/plan-my-money/onboarding');
      }
    }
  }, [activePlan, planLoading, authLoading, user, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-xl font-medium text-gray-500 animate-pulse">Loading your financial profile...</div>
    </div>
  );
}
