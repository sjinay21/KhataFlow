'use client';

import { PlanMyMoneyProvider } from '@/context/PlanMyMoneyContext';

export default function PlanMyMoneyLayout({ children }) {
  return (
    <PlanMyMoneyProvider>
      {children}
    </PlanMyMoneyProvider>
  );
}
