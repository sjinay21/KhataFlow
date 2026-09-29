'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/*
// OLD CODE: previous implementation preserved for project history.
// import React from 'react';
// import Link from 'next/link';
// import Button from '@/components/ui/Button';
// import Card from '@/components/ui/Card';
// 
// export default function RegisterPlaceholder() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 sm:px-6 lg:px-8 bg-slate-50">
//       <Card className="max-w-md w-full p-8 text-center border-t-4 border-t-primary-500">
//         <div className="mx-auto w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
//           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
//         </div>
//         
//         <h2 className="text-2xl font-bold text-slate-900 mb-2">Create an Account</h2>
//         
//         <div className="my-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm text-left">
//           <p className="font-semibold mb-1">Phase 2 Notice:</p>
//           <p>This is a temporary public placeholder page to keep navigation safe. Real registration, user accounts, and database logic are <strong>excluded</strong> from Phase 2 and will be built in <strong>Phase 3</strong>.</p>
//         </div>
//         
//         <div className="space-y-4">
//           <Link href="/" tabIndex={-1}>
//             <Button variant="primary" className="w-full justify-center">
//               Return to Home Page
//             </Button>
//           </Link>
//         </div>
//       </Card>
//     </div>
//   );
// }
// REASON FOR CHANGE: Replacing placeholder with actual registration form for Phase 3.
*/

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await register(name, email, password);

    if (!result.success) {
      setError(result.message || 'Registration failed. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 sm:px-6 lg:px-8 bg-slate-50">
      <Card className="max-w-md w-full p-8 text-center border-t-4 border-t-primary-500">
        <div className="mx-auto w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Create an Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">Full Name</label>
            <input 
              id="name"
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full justify-center" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
