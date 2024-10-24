'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { paths } from '@/routes/paths';

export default function SignupConfirmationPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-primary/5 to-primary/10 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-primary">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              We&apos;ve sent you a confirmation email
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 pt-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-12 w-12 text-primary" />
              </div>
            </motion.div>
            <p className="text-center text-sm text-muted-foreground">
              We&apos;ve sent a confirmation email to your inbox. Please click
              the link in the email to verify your account.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" asChild>
              <Link href={paths.auth.signIn}>Return to Sign In</Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <Link
                href="/auth/resend-confirmation"
                className="text-primary hover:underline"
              >
                click here to resend
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
