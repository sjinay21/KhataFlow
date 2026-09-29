//
// OLD CODE: previous implementation preserved for project history.
// import React from 'react';
// import Card from '@/components/ui/Card';
// 
// export default function Features() {
//   return (
//     <section id="features" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Why choose KhataFlow?</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <Card className="p-6">
//             <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
//               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
//             </div>
//             <h3 className="text-xl font-bold text-slate-900 mb-2">Plan your money</h3>
//             <p className="text-slate-600">Allocate your monthly salary toward essentials, lifestyle, and savings before the month even begins.</p>
//           </Card>
//           <Card className="p-6">
//             <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
//               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//             </div>
//             <h3 className="text-xl font-bold text-slate-900 mb-2">Track your expenses</h3>
//             <p className="text-slate-600">Manually log your daily spending to stay acutely aware of where your money is going.</p>
//           </Card>
//           <Card className="p-6">
//             <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
//               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//             </div>
//             <h3 className="text-xl font-bold text-slate-900 mb-2">Understand your position</h3>
//             <p className="text-slate-600">See the difference between what you planned and what you recorded.</p>
//           </Card>
//           <Card className="p-6">
//             <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
//               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
//             </div>
//             <h3 className="text-xl font-bold text-slate-900 mb-2">Work toward goals</h3>
//             <p className="text-slate-600">Set aside money for the future and watch your progress grow month by month.</p>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// }
// REASON FOR CHANGE: Phase 7 layout refactor. Updated to match the new 4 distinct feature sections from the monolithic page design.
//

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Features() {
  return (
    <>
      {/* 3. PLAN YOUR MONEY */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Plan Your Money</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Set your income, essential expenses, priorities and monthly allocation.
          </p>
          <Link href="/plan-my-money" tabIndex={-1}>
            <Button variant="primary" size="lg">Explore Plan My Money</Button>
          </Link>
        </div>
      </section>

      {/* 4. TRACK YOUR EXPENSES */}
      <section className="py-24 bg-white border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Track Your Expenses</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Record what you actually spend.
          </p>
          <Link href="/expenses" tabIndex={-1}>
            <Button variant="primary" size="lg">Track Expenses</Button>
          </Link>
        </div>
      </section>

      {/* 5. SEE YOUR SPENDING */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">See Your Spending</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Reports help you see patterns, categories and spending trends.
          </p>
        </div>
      </section>

      {/* 6. YOUR GOALS */}
      <section className="py-24 bg-white border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Your Goals</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Set a target and track your progress.
          </p>
        </div>
      </section>
    </>
  );
}
