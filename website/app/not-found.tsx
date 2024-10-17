import React from 'react';
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <FileQuestion className="mx-auto h-16 w-16 text-blue-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link href="/" passHref>
            <Button className="w-full">
              Return to homepage
            </Button>
          </Link>
          <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
            Go back
          </Button>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          If you believe this is a mistake, please contact our support team.
        </p>
      </div>
    </div>
  );
}