'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';
import { useAuth } from '@/context/AuthContext';
import Step1BasicInfo from '@/components/plan-my-money/Step1BasicInfo';
import Step2LivingSituation from '@/components/plan-my-money/Step2LivingSituation';
import Step3Expenses from '@/components/plan-my-money/Step3Expenses';
import Step4Priorities from '@/components/plan-my-money/Step4Priorities';
import Step5ModelCompare from '@/components/plan-my-money/Step5ModelCompare';
import Step6Allocation from '@/components/plan-my-money/Step6Allocation';
import Step7Review from '@/components/plan-my-money/Step7Review';
import Step8Save from '@/components/plan-my-money/Step8Save';

function OnboardingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const { user, loading: authLoading } = useAuth();
  const { step, setStep } = usePlanMyMoney();

  // Read step from URL or fallback to context step
  useEffect(() => {
    const urlStep = parseInt(searchParams.get('step'), 10);
    if (urlStep && urlStep >= 1 && urlStep <= 8) {
      if (urlStep !== step) setStep(urlStep);
    } else {
      router.replace(`${pathname}?step=${step}`);
    }
  }, [searchParams, step, router, pathname, setStep]);

  if (authLoading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1BasicInfo />;
      case 2: return <Step2LivingSituation />;
      case 3: return <Step3Expenses />;
      case 4: return <Step4Priorities />;
      case 5: return <Step5ModelCompare />;
      case 6: return <Step6Allocation />;
      case 7: return <Step7Review />;
      case 8: return <Step8Save />;
      default: return <Step1BasicInfo />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Plan My Money</h1>
        <p className="mt-2 text-sm text-gray-600">Step {step} of 8</p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(step / 8) * 100}%` }}></div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        {renderStep()}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading wizard...</div>}>
      <OnboardingWizard />
    </Suspense>
  );
}
