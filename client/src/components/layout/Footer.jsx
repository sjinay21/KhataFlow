"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

/*
// OLD CODE: previous implementation preserved for project history.
// export default function Footer() {
// ...
//   <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//     <div className="md:col-span-2">
//       ...
//       Simple manual personal finance tracking. No bank connections, no anxiety—just clarity.
// ...
//   <p className="text-base text-slate-500 text-center md:text-left">
// REASON FOR CHANGE: Phase 7 Footer UI polish. Removed em dash, added Company links (About/Contact), improved grid layout, and made copyright text slightly smaller. Also updated information architecture to match standard SaaS footer layout (Product, App, Company).
*/
export default function Footer() {
  const { user, logout } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          
          {/* Brand & Summary */}
          <div className="sm:col-span-2 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md">
              KhataFlow
            </Link>
            <p className="mt-4 text-slate-600 max-w-sm">
              Simple manual personal finance tracking. No bank connections, no anxiety, just clarity.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={user ? "/plan-my-money" : "/login"} className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors">
                  Plan My Money
                </Link>
              </li>
              <li>
                <Link href={user ? "/expenses" : "/login"} className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors">
                  My Expenses
                </Link>
              </li>
              <li>
                <Link href={user ? "/reports" : "/login"} className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link href={user ? "/goals" : "/login"} className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors">
                  Goals
                </Link>
              </li>
            </ul>
          </div>

          {/* App Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
              App
            </h3>
            <ul className="space-y-3">
              {user ? (
                <>
                  <li>
                    <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors text-left w-full">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom / Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {currentYear} KhataFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
