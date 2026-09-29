//
// OLD CODE: previous implementation preserved for project history.
// import React from 'react';
// import Link from 'next/link';
// import Button from '@/components/ui/Button';
// 
// export default function Hero() {
//   return (
//     <section className="bg-slate-50 py-20 lg:py-32">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <p className="text-primary-600 font-semibold tracking-wide uppercase mb-4">Simple Personal Finance</p>
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto">
//           Understand your money without the anxiety.
//         </h1>
//         <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
//           Track your income, plan your essential expenses, and know exactly how much you can safely spend. No complicated bank syncing required—just clarity.
//         </p>
//         <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
//           <Link href="/register" tabIndex={-1}>
//             <Button variant="primary" size="lg">Start Planning Today</Button>
//           </Link>
//           <Link href="#how-it-works" tabIndex={-1}>
//             <Button variant="outline" size="lg">See How It Works</Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
// REASON FOR CHANGE: Phase 7 layout refactor. Updated to match the new Hero section from the monolithic page design.
//

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="bg-slate-50 pt-20 pb-12 lg:pt-32 lg:pb-20 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-primary-600 font-semibold tracking-wide uppercase mb-4">
          Simple Personal Finance
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
          Plan your money.<br />
          Track your spending.<br />
          Stay in control.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A simple way to plan monthly finances, record expenses, understand spending, and work toward your goals.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/register" tabIndex={-1}>
            <Button variant="primary" size="lg">Start Planning Today</Button>
          </Link>
          <Link href="#how-it-works" tabIndex={-1}>
            <Button variant="outline" size="lg">See How It Works</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
