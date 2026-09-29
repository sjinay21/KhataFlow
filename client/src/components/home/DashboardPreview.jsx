//
// OLD CODE: previous implementation preserved for project history.
// import React from 'react';
// 
// export default function DashboardPreview() {
//   return (
//     <section className="py-12 bg-white relative -mt-10 overflow-hidden px-4">
//       <div className="max-w-5xl mx-auto rounded-2xl shadow-xl border border-slate-200 bg-slate-50 overflow-hidden relative">
//         <div className="absolute top-0 right-0 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
//           Illustrative Preview
//         </div>
//         <div className="flex border-b border-slate-200 bg-white p-4 items-center">
//           <div className="flex space-x-2">
//             <div className="w-3 h-3 rounded-full bg-red-400"></div>
//             <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//             <div className="w-3 h-3 rounded-full bg-green-400"></div>
//           </div>
//           <div className="ml-4 text-sm text-slate-400 font-medium">Dashboard - Sample Data</div>
//         </div>
//         <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
//             <h3 className="text-lg font-semibold text-slate-800 mb-4">Plan My Money</h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center pb-2 border-b border-slate-100">
//                 <span className="text-slate-600">Monthly Salary</span>
//                 <span className="font-medium text-green-600">+ ₹50,000</span>
//               </div>
//               <div className="flex justify-between items-center pb-2 border-b border-slate-100">
//                 <span className="text-slate-600">Rent</span>
//                 <span className="font-medium text-slate-900">- ₹15,000</span>
//               </div>
//               <div className="flex justify-between items-center pb-2 border-b border-slate-100">
//                 <span className="text-slate-600">Groceries</span>
//                 <span className="font-medium text-slate-900">- ₹8,000</span>
//               </div>
//             </div>
//           </div>
//           <div className="bg-primary-600 p-6 rounded-xl shadow-sm text-white flex flex-col justify-center items-center">
//             <h3 className="text-primary-100 font-medium mb-2">Estimated Remaining Money</h3>
//             <div className="text-4xl font-bold">₹27,000</div>
//             <p className="mt-4 text-sm text-primary-200 text-center">Safe to spend or save based on your plan.</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// REASON FOR CHANGE: Phase 7 layout refactor. Updated to match the new abstract minimalist Dashboard Preview section from the monolithic page design.
//

import React from 'react';

export default function DashboardPreview() {
  return (
    <section className="bg-slate-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl shadow-xl border border-slate-200 bg-white overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50 p-4 items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="ml-4 text-sm text-slate-500 font-medium font-mono">dashboard / application preview</div>
          </div>
          {/* App preview with real dummy data */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold text-slate-800 mb-6">September Plan</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Monthly Salary</span>
                  <span className="font-bold text-green-600">+ ₹50,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Rent & Utilities</span>
                  <span className="font-bold text-slate-800">- ₹15,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Groceries</span>
                  <span className="font-bold text-slate-800">- ₹8,000</span>
                </div>
              </div>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl border border-primary-100 flex flex-col justify-center items-center text-center">
              <h3 className="text-primary-700 font-semibold mb-2">Safe to Spend</h3>
              <div className="text-4xl font-extrabold text-primary-900 mb-2">₹27,000</div>
              <p className="text-sm text-primary-600">Estimated remaining money after planned expenses.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
