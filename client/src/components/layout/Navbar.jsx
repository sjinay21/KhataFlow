"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close menu on Escape and return focus to button
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={user ? "/dashboard" : "/"} className="text-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md">
              KhataFlow
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav aria-label="Desktop Navigation" className="hidden md:flex flex-1 justify-center items-center space-x-4 lg:space-x-8">
            {/* 
            // OLD CODE: previous implementation preserved for project history.
            // <Link href="/about" className="...">About</Link>
            // <Link href="/contact" className="...">Contact</Link>
            // REASON FOR CHANGE: Refactoring Navbar layout for Phase 7 polish. 
            // When authenticated, primary financial links move to the center.
            // When not authenticated, About and Contact remain in the center.
            */}
            {user ? (
              <>
                <Link href="/dashboard" className={`font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/dashboard' ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-slate-900'}`}>
                  Dashboard
                </Link>
                <Link href="/plan-my-money" className={`font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/plan-my-money' ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-slate-900'}`}>
                  Plan My Money
                </Link>
                <Link href="/expenses" className={`font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/expenses' ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-slate-900'}`}>
                  My Expenses
                </Link>
                <Link href="/reports" className={`font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/reports' ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-slate-900'}`}>
                  Reports
                </Link>
                <Link href="/goals" className={`font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/goals' ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-slate-900'}`}>
                  Goals
                </Link>
              </>
            ) : (
              <>
                <Link href="/about" className={`font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/about' ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-slate-900'}`}>
                  About
                </Link>
                <Link href="/contact" className={`font-medium px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/contact' ? 'text-primary-700 bg-primary-50' : 'text-slate-600 hover:text-slate-900'}`}>
                  Contact
                </Link>
              </>
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {/* 
            // OLD CODE: previous implementation preserved for project history.
            // {user ? ( ... links ... <Button onClick={logout}>Logout</Button> ) : ( ... Login/Register ... )}
            // REASON FOR CHANGE: Links moved to center nav. Only Logout remains here when authenticated.
            */}
            {user ? (
              <Button variant="ghost" onClick={logout}>Logout</Button>
            ) : (
              <>
                <Link href="/login" tabIndex={-1}>
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register" tabIndex={-1}>
                  <Button variant="primary">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              ref={menuButtonRef}
              type="button"
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <>
                  {/*
                  Old implementation:
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reason for replacement:
                  The SVG path was only being used for a simple X/close icon.
                  A simpler text implementation keeps the UI code readable and requires less code.
                  */}
                  <span className="text-2xl leading-none font-light w-6 h-6 flex items-center justify-center" aria-hidden="true">&times;</span>
                </>
              ) : (
                <>
                  {/*
                  Old implementation:
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Reason for replacement:
                  The SVG path was only being used for a simple hamburger menu icon.
                  A simpler span implementation keeps the UI code readable and avoids complex paths.
                  */}
                  <div className="flex flex-col justify-center items-center w-6 h-6 space-y-1" aria-hidden="true">
                    <span className="block w-5 h-0.5 bg-current rounded-sm"></span>
                    <span className="block w-5 h-0.5 bg-current rounded-sm"></span>
                    <span className="block w-5 h-0.5 bg-current rounded-sm"></span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <nav aria-label="Mobile Navigation" className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-slate-200 shadow-sm">
            {/* 
            // Changed because: Project owner selected Option A navigation (Basic Professional).
            // Replaced same-page anchor links with actual routes for About and Contact pages.
            <Link 
              href="/#features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#how-it-works" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            */}
            {/* 
            OLD CODE:
            <Link 
              href="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/about' ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/contact' ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="mt-4 pt-4 border-t border-slate-200">
              {user ? (
                <>
                  <Link 
                    href="/plan-my-money" 
                    className={`block w-full text-center px-4 py-2 text-base font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2 ${pathname === '/plan-my-money' ? 'text-primary-700 bg-primary-50 border-primary-200' : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Plan My Money
                  </Link>
                  <Link 
                    href="/expenses" 
                    className={`block w-full text-center px-4 py-2 text-base font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2 ${pathname === '/expenses' ? 'text-primary-700 bg-primary-50 border-primary-200' : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Expenses
                  </Link>
                  <Link 
                    href="/reports" 
                    className={`block w-full text-center px-4 py-2 text-base font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2 ${pathname === '/reports' ? 'text-primary-700 bg-primary-50 border-primary-200' : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reports
                  </Link>
                  <Link 
                    href="/goals" 
                    className={`block w-full text-center px-4 py-2 text-base font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2 ${pathname === '/goals' ? 'text-primary-700 bg-primary-50 border-primary-200' : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Goals
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className={`block w-full text-center px-4 py-2 text-base font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2 ${pathname === '/dashboard' ? 'text-primary-700 bg-primary-50 border-primary-200' : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="block w-full text-center px-4 py-2 text-base font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
            
            REASON FOR CHANGE: 
            Point 9: Hide public navigation (About/Contact) from authenticated users in the mobile menu, just like on desktop.
            */}
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 mb-1 ${pathname === '/dashboard' ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/plan-my-money" 
                  className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 mb-1 ${pathname === '/plan-my-money' ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Plan My Money
                </Link>
                <Link 
                  href="/expenses" 
                  className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 mb-1 ${pathname === '/expenses' ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Expenses
                </Link>
                <Link 
                  href="/reports" 
                  className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 mb-1 ${pathname === '/reports' ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reports
                </Link>
                <Link 
                  href="/goals" 
                  className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4 ${pathname === '/goals' ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Goals
                </Link>
                
                <div className="pt-4 border-t border-slate-200">
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 text-base font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/about" 
                  className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/about' ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 ${pathname === '/contact' ? 'text-primary-700 bg-primary-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <Link 
                    href="/login" 
                    className="block w-full text-center px-4 py-2 text-base font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
