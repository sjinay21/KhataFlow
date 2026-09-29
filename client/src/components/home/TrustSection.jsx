import React from 'react';

export default function TrustSection() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">Clarity over complexity.</h2>
            <p className="text-lg text-slate-300 mb-4">
              We believe in manual tracking. By entering your expenses yourself, you stay connected to your spending habits. We calculate your <strong>Estimated Remaining Money</strong> based on your inputs, helping you avoid overspending without needing access to your actual bank account.
            </p>
          </div>
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Built for manual tracking.</h3>
            <p className="text-slate-300">
              KhataFlow is designed around simple manual tracking. You can plan and record your money without connecting a bank account. We do not integrate with banks, we do not require your UPI details, and we do not use third-party financial providers. Security and account isolation will be implemented in later phases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
