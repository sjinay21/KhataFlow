import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AboutPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 sm:px-6 lg:px-8 bg-slate-50">
      <Card className="max-w-md w-full p-8 text-center border-t-4 border-t-primary-500">
        <div className="mx-auto w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
          {/* 
          // OLD CODE: previous implementation preserved for project history.
          // <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          // REASON FOR CHANGE: The inline SVG code was confusing. It was just drawing an "Information (i)" icon. Replaced it with a simple text "i" for clarity.
          */}
          <span className="text-2xl font-bold italic">i</span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">About KhataFlow</h2>
        
        <div className="my-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm text-left">
          <p className="font-semibold mb-1">Phase 2 Notice:</p>
          <p>This is a temporary public placeholder page to keep navigation safe. The detailed About page content will be added in a future content phase.</p>
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
