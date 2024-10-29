'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from '@/routes/hooks';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { signInWithPassword } from '@/auth/context/supabase';
import { useAuthContext } from '@/auth/hooks';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { paths } from '@/routes/paths';
import { Eye, EyeOff } from 'lucide-react';

// Define the schema for form validation
export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkUserSession } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsRedirecting(true);
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();

      const returnTo =
        searchParams.get('returnTo') ||
        sessionStorage.getItem('bookingReturnUrl');

      if (returnTo) {
        sessionStorage.removeItem('bookingReturnUrl');
        const decodedUrl = decodeURIComponent(returnTo);
        router.push(decodedUrl);
      } else {
        router.push(paths.home);
      }
    } catch (error) {
      setIsRedirecting(false);
      console.error(error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    }
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-primary/5 to-primary/10 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-primary">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href={paths.auth.resetPassword}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={
                      errors.password ? 'border-red-500 pr-10' : 'pr-10'
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting || isRedirecting}
              >
                {isRedirecting
                  ? 'Redirecting...'
                  : isSubmitting
                  ? 'Signing in...'
                  : 'Sign In'}
              </Button>
            </form>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMsg}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground w-full">
              Don&apos;t have an account?{' '}
              <Link
                href={`${paths.auth.signUp}?returnTo=${encodeURIComponent(
                  searchParams.get('returnTo') || ''
                )}`}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
