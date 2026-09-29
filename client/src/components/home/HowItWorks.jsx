//
// OLD CODE: previous implementation preserved for project history.
// import React from 'react';
// 
// export default function HowItWorks() {
//   return (
//     <section id="how-it-works" className="py-20 bg-slate-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">How it works</h2>
//         </div>
//         <div className="max-w-3xl mx-auto space-y-12">
//           {[
//             { step: 1, title: 'Add your monthly income', text: 'Start by entering what you expect to earn this month.' },
//             { step: 2, title: 'Plan your fixed and variable expenses', text: 'Allocate money to rent, groceries, and other needs before the month starts.' },
//             { step: 3, title: 'Track what you spend daily', text: 'Log your expenses manually to stay mindful of every purchase.' },
//             { step: 4, title: 'Understand your estimated remaining money and goals', text: 'See exactly what you have left to safely spend or save.' },
//           ].map((item) => (
//             <div key={item.step} className="flex items-start">
//               <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold text-xl">
//                 {item.step}
//               </div>
//               <div className="ml-6">
//                 <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
//                 <p className="mt-2 text-slate-600">{item.text}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// REASON FOR CHANGE: Phase 7 layout refactor. Updated to match the new 3-column "How KhataFlow Works" section from the monolithic page design.
//

import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2">How KhataFlow Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Plan</h3>
            <p className="text-slate-600 leading-relaxed">
              Plan your monthly money
            </p>
          </div>
          <div>
            <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Track</h3>
            <p className="text-slate-600 leading-relaxed">
              Record your everyday expenses
            </p>
          </div>
          <div>
            <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Understand</h3>
            <p className="text-slate-600 leading-relaxed">
              See where your money goes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
