'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function AboutPage() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About KhataFlow</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            KhataFlow helps you organize your expenses, understand your financial situation, and create a practical starting plan for managing your money.
          </p>
        </section>

        {/* WHAT IS KHATAFLOW? */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is KhataFlow?</h2>
          <p className="text-slate-600 mb-4">
            KhataFlow is a personal finance and expense-planning web application designed to help you take control of your financial life. We provide the tools you need to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Track your expenses</li>
            <li>Organize your financial information</li>
            <li>Understand exactly where your money is going</li>
            <li>Plan how your available money can be allocated</li>
            <li>Set your financial priorities</li>
            <li>Review a personalized starting recommendation</li>
            <li>Adjust the recommendation before saving your final plan</li>
          </ul>
        </section>

        {/* WHAT CAN YOU DO WITH KHATAFLOW? */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">What can you do with KhataFlow?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-primary-700 mb-2">1. Expense Tracking</h3>
              <p className="text-slate-600">Record and organize your expenses so you can better understand your spending habits.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-primary-700 mb-2">2. Financial Overview</h3>
              <p className="text-slate-600">Provide information about your income and financial situation to build a clearer picture of your finances.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-primary-700 mb-2">3. Living Situation</h3>
              <p className="text-slate-600">Provide information such as housing situation, EMI, utilities, and other relevant commitments.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-primary-700 mb-2">4. Current and Planned Expenses</h3>
              <p className="text-slate-600">Enter your current or planned spending so KhataFlow can consider your existing financial commitments.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-primary-700 mb-2">5. Savings and Priorities</h3>
              <p className="text-slate-600">Identify savings goals or priorities that matter the most to you.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 bg-primary-50">
              <h3 className="text-lg font-bold text-primary-700 mb-2">6. Personalized Money Planning</h3>
              <p className="text-slate-600 font-medium mb-1">
                Tell KhataFlow about your financial situation → KhataFlow analyzes it → KhataFlow creates a starting recommendation → You review and adjust it.
              </p>
              <p className="text-sm text-slate-600">KhataFlow uses the information provided by you to create a personalized starting recommendation.</p>
            </div>
          </div>
        </section>

        {/* HOW PLAN MY MONEY WORKS */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How "Plan My Money" Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-700 font-bold rounded-full flex items-center justify-center">01</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Tell us about your financial situation</h4>
                <p className="text-slate-600">Provide relevant financial information such as income and existing commitments.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-700 font-bold rounded-full flex items-center justify-center">02</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Tell us about your living situation</h4>
                <p className="text-slate-600">Provide information about housing, EMI, utilities, and other relevant living expenses.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-700 font-bold rounded-full flex items-center justify-center">03</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Add current and planned expenses</h4>
                <p className="text-slate-600">Provide information about how you expect to use your money.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-700 font-bold rounded-full flex items-center justify-center">04</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Set your priorities</h4>
                <p className="text-slate-600">Provide your savings goals and financial priorities.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-700 font-bold rounded-full flex items-center justify-center">05</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">KhataFlow analyzes your information</h4>
                <p className="text-slate-600">KhataFlow considers the information you provided and generates a personalized starting allocation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-700 font-bold rounded-full flex items-center justify-center">06</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Review and adjust</h4>
                <p className="text-slate-600">You can review the recommendation and modify it before saving.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-700 font-bold rounded-full flex items-center justify-center">07</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Finalize your plan</h4>
                <p className="text-slate-600">Review the final allocation and save your plan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">City Reference</h3>
            <p className="text-slate-600 mb-4">
              City information can provide a general reference point for common living costs. Your own entered expenses remain important to your personalized plan.
            </p>
          </section>
          <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Standard Planning Methods</h3>
            <p className="text-slate-600 mb-4">
              You also have access to standard allocation frameworks such as Simple 50/30/20, Detailed Allocation, and Balanced Allocation as alternative starting methods if you prefer to choose a planning framework yourself.
            </p>
          </section>
        </div>

        {/* USER CONTROL & WHY KHATAFLOW */}
        <div className="space-y-8">
          <section className="bg-primary-50 rounded-xl p-8 shadow-sm border border-primary-100 text-center">
            <h3 className="text-2xl font-bold text-primary-800 mb-4">User Control</h3>
            <p className="text-lg text-primary-700">
              KhataFlow provides a starting recommendation based on the information you provide. You can review, adjust, and decide how you want to structure your final plan.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Why KhataFlow?</h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-slate-600 max-w-2xl mx-auto list-disc pl-6">
              <li>Bring financial information into one place</li>
              <li>Make spending easier to understand</li>
              <li>Turn financial information into a structured plan</li>
              <li>Help you think about priorities</li>
              <li>Provide a clear starting point for financial planning</li>
              <li>Allow you to review and adjust your plan</li>
            </ul>
          </section>
        </div>

        {/* FINAL CTA */}
        <section className="text-center py-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to organize your money?</h2>
          {user ? (
            <Link href="/dashboard" tabIndex={-1}>
              <Button variant="primary" size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <Link href="/register" tabIndex={-1}>
              <Button variant="primary" size="lg">Get Started</Button>
            </Link>
          )}
        </section>

      </div>
    </div>
  );
}
