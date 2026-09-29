//
// OLD CODE: previous implementation preserved for project history.
// import React from 'react';
// import Link from 'next/link';
// import Button from '@/components/ui/Button';
// 
// export default function FinalCTA() {
//   return (
//     <section className="py-24 bg-primary-600 text-center">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">Ready to take control?</h2>
//         <p className="text-xl text-primary-100 mb-10">Join KhataFlow today and start planning your financial future with confidence.</p>
//         <Link href="/register" tabIndex={-1}>
//           {/* Changed because: The previous className override caused white-on-white text due to Tailwind class conflicts. Using the dedicated inverse variant fixes this. */}
//           {/* <Button size="lg" className="bg-white text-primary-600 hover:bg-slate-50 border-white"> */}
//           <Button variant="inverse" size="lg">
//             Create Your Free Account
//           </Button>
//         </Link>
//       </div>
//     </section>
//   );
// }
// REASON FOR CHANGE: Phase 7 layout refactor. Updated to match the new minimalist Bottom CTA from the monolithic page design.
//

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-primary-600 border-t border-primary-700 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white mb-10">Ready to take control?</h2>
        <Link href="/register" tabIndex={-1}>
          <Button variant="inverse" size="lg" className="font-bold">
            Start Planning Today
          </Button>
        </Link>
      </div>
    </section>
  );
}
