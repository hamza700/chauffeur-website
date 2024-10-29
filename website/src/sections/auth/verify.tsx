'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { useRouter, useSearchParams } from '@/routes/hooks';
import { motion } from 'framer-motion';
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
import { paths } from '@/routes/paths';
import { verifyOtp, resendOtp } from '@/auth/context/supabase';
import { useAuthContext } from '@/auth/hooks';

// Define the schema for form validation
const VerifyOtpSchema = zod.object({
  code: zod
    .string()
    .min(1, { message: 'Verification code is required!' })
    .length(6, { message: 'Verification code must be 6 characters!' }),
});

type VerifyOtpSchemaType = zod.infer<typeof VerifyOtpSchema>;

export default function VerifyPage() {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpSchemaType>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      code: '',
    },
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await verifyOtp({
        email,
        token: data.code,
      });
      await checkUserSession?.();

      // Check for stored return URL
      const returnTo = sessionStorage.getItem('postVerificationReturnUrl');
      if (returnTo) {
        sessionStorage.removeItem('postVerificationReturnUrl');
        router.push(returnTo);
      } else {
        router.push(paths.home);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : String(error));
    }
  });

  const handleResend = async () => {
    try {
      await resendOtp({
        email,
      });
      setTimeLeft(60);
      setErrorMsg('');
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : String(error));
    }
  };

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
              Verify Your Account
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter the verification code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium">
                  Verification Code
                </Label>
                <Input
                  id="code"
                  type="text"
                  {...register('code')}
                  className={`w-full px-3 py-2 border rounded-md text-center text-2xl tracking-widest ${
                    errors.code ? 'border-red-500' : ''
                  }`}
                  maxLength={6}
                />
                {errors.code && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.code.message}
                  </motion.p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Verify'}
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
          <CardFooter className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-2">
              Didn&apos;t receive the code?
            </p>
            <Button
              variant="link"
              onClick={handleResend}
              disabled={timeLeft > 0}
              className="text-primary hover:underline"
            >
              {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend Code'}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
