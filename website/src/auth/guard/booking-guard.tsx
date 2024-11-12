'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import LoadingScreen from '@/components/ui/loading-screen';
import { useBooking } from '@/context/booking/booking-context';

type Props = {
  children: React.ReactNode;
  requireReference?: boolean;
};

export function BookingGuard({ children, requireReference = false }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const { state } = useBooking();

  useEffect(() => {
    const checkBookingRequirements = () => {
      if (requireReference) {
        const reference = searchParams.get('ref');
        const sessionId = searchParams.get('session_id');

        if (!reference || !sessionId) {
          console.log('Redirecting: Missing required parameters');
          router.replace(paths.home);
          return;
        }
      } else {
        const requiredParams = ['type', 'pickupLocation', 'date', 'time'];
        const missingParams = requiredParams.filter(
          (param) => !searchParams.get(param)
        );

        if (missingParams.length > 0) {
          router.replace(paths.home);
          return;
        }
      }

      setIsChecking(false);
    };

    checkBookingRequirements();
  }, [searchParams, router, requireReference, state.bookingReference]);

  if (isChecking) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
