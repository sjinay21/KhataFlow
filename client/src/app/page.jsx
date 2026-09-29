/*
// Previous implementation:
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center">
      <h1 className="text-3xl font-semibold text-slate-900 mb-2">KhataFlow</h1>
      <p className="text-slate-500 max-w-md">
        Phase 1 technical foundation is set up. The project is ready for Phase 2 development.
      </p>
    </div>
  );
}

// Changed because: Implementing the Phase 2 Premium Home Page.
*/

/*
// Previous monolithic implementation preserved for Phase 2 strict rules:
// Changed because: The project owner requested structural refactoring to componentize the home page into the components/home folder for better maintainability, readability, and reuse.
import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section * /}
      <section className="bg-slate-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-600 font-semibold tracking-wide uppercase mb-4">Simple Personal Finance</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto">
            Understand your money without the anxiety.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Track your income, plan your essential expenses, and know exactly how much you can safely spend. No complicated bank syncing required—just clarity.
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

      {/* Static Dashboard Preview * /}
      <section className="py-12 bg-white relative -mt-10 overflow-hidden px-4">
        <div className="max-w-5xl mx-auto rounded-2xl shadow-xl border border-slate-200 bg-slate-50 overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
            Illustrative Preview
          </div>
          <div className="flex border-b border-slate-200 bg-white p-4 items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="ml-4 text-sm text-slate-400 font-medium">Dashboard - Sample Data</div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Plan My Money</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Monthly Salary</span>
                  <span className="font-medium text-green-600">+ ₹50,000</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Rent</span>
                  <span className="font-medium text-slate-900">- ₹15,000</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Groceries</span>
                  <span className="font-medium text-slate-900">- ₹8,000</span>
                </div>
              </div>
            </div>
            <div className="bg-primary-600 p-6 rounded-xl shadow-sm text-white flex flex-col justify-center items-center">
              <h3 className="text-primary-100 font-medium mb-2">Estimated Remaining Money</h3>
              <div className="text-4xl font-bold">₹27,000</div>
              <p className="mt-4 text-sm text-primary-200 text-center">Safe to spend or save based on your plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition * /}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Why choose KhataFlow?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Plan your money</h3>
              <p className="text-slate-600">Allocate your monthly salary toward essentials, lifestyle, and savings before the month even begins.</p>
            </Card>
            <Card className="p-6">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Track your expenses</h3>
              <p className="text-slate-600">Manually log your daily spending to stay acutely aware of where your money is going.</p>
            </Card>
            <Card className="p-6">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Understand your position</h3>
              <p className="text-slate-600">See the difference between what you planned and what you recorded.</p>
            </Card>
            <Card className="p-6">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Work toward goals</h3>
              <p className="text-slate-600">Set aside money for the future and watch your progress grow month by month.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works * /}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">How it works</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-12">
            {[
              { step: 1, title: 'Add your monthly income', text: 'Start by entering what you expect to earn this month.' },
              { step: 2, title: 'Plan your fixed and variable expenses', text: 'Allocate money to rent, groceries, and other needs before the month starts.' },
              { step: 3, title: 'Track what you spend daily', text: 'Log your expenses manually to stay mindful of every purchase.' },
              { step: 4, title: 'Understand your estimated remaining money and goals', text: 'See exactly what you have left to safely spend or save.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold text-xl">
                  {item.step}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Clarity Section (Privacy/Trust) * /}
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

      {/* Final Call to Action * /}
      <section className="py-24 bg-primary-600 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">Ready to take control?</h2>
          <p className="text-xl text-primary-100 mb-10">Join KhataFlow today and start planning your financial future with confidence.</p>
          <Link href="/register" tabIndex={-1}>
            <Button size="lg" className="bg-white text-primary-600 hover:bg-slate-50 border-white">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
/*
// OLD CODE: previous implementation preserved for project history.
// export default function Home() {
//   return (
//     <div className="flex flex-col">
//       <section className="bg-slate-50 pt-20 pb-12 lg:pt-32 lg:pb-20 text-center">...
// REASON FOR CHANGE: Phase 7 layout refactor. Extracted all monolithic landing page sections back into their dedicated `components/home` files to maintain clean component orchestration in `page.jsx`.
*/

import DashboardPreview from "@/components/home/DashboardPreview";
import Features from "@/components/home/Features";
import FinalCTA from "@/components/home/FinalCTA";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <DashboardPreview />
      <HowItWorks />
      <Features />
      <FinalCTA />
    </div>
  );
}
