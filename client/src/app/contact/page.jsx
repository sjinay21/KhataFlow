import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ContactPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 sm:px-6 lg:px-8 bg-slate-50">
      <Card className="max-w-md w-full p-8 text-center border-t-4 border-t-primary-500">
        <div className="mx-auto w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Contact Us</h2>
        
        <div className="my-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm text-left">
          <p className="font-semibold mb-1">Phase 2 Notice:</p>
          <p>This is a temporary public placeholder page to keep navigation safe. Contact forms and support routing will be implemented in a future phase.</p>
        </div>
        
        <div className="space-y-4">
          <Link href="/" tabIndex={-1}>
            <Button variant="primary" className="w-full justify-center">
              Return to Home Page
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
