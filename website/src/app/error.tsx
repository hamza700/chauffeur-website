'use client';

import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { paths } from '@/routes/paths';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-primary/10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AlertCircle className="mx-auto h-20 w-20 text-destructive mb-4" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-primary mb-2">
              Oops! Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 text-center">
              {
                "We're sorry, but we couldn't complete your request. Our team has been notified and is working on a solution."
              }
            </p>
            <div className="space-y-4">
              <Button onClick={reset} className="w-full" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" /> Try again
              </Button>
              <Link href={paths.home} passHref>
                <Button variant="outline" className="w-full" size="lg">
                  <Home className="mr-2 h-4 w-4" /> Return to homepage
                </Button>
              </Link>
              <Button
                variant="link"
                className="w-full"
                onClick={() => window.location.reload()}
              >
                Refresh the page
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground text-center w-full">
              If the problem persists, please contact our{' '}
                support team
              .
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
