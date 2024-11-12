'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { useBooking } from '@/context/booking/booking-context';
import { useAuthContext } from '@/auth/hooks';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentProps {
  onBack: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onBack }) => {
  const { dispatch, state } = useBooking();
  const router = useRouter();
  const { authenticated, loading, user } = useAuthContext();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    vehicle,
    initialBookingDetails,
    distanceData,
    priceDetails,
    bookingReference,
  } = state;

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push(paths.auth.signIn);
    }
  }, [authenticated, loading, router]);

  useEffect(() => {
    if (!bookingReference) {
      const newBookingReference =
        'BK' + Math.random().toString(36).substr(2, 8).toUpperCase();
      dispatch({ type: 'SET_BOOKING_REFERENCE', payload: newBookingReference });
    }

    const createCheckoutSession = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-checkout-session`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              distance: distanceData.distance,
              vehicleClass: vehicle,
              isAirportTransfer: priceDetails.isAirportTransfer ?? false,
              pickupTime: priceDetails.pickupTime,
              hours: initialBookingDetails.duration,
              bookingType: initialBookingDetails.type,
              ref: bookingReference,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        setError('Failed to create checkout session');
        console.error(err);
      }
    };

    if (authenticated && !clientSecret && bookingReference) {
      createCheckoutSession();
    }
  }, [
    authenticated,
    clientSecret,
    dispatch,
    distanceData.distance,
    vehicle,
    priceDetails.isAirportTransfer,
    priceDetails.pickupTime,
    initialBookingDetails.duration,
    initialBookingDetails.type,
    bookingReference,
  ]);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Payment Details</h2>

        {error ? (
          <div className="p-4 bg-red-50 rounded-lg text-red-800">
            {error}
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : clientSecret ? (
          <div className="w-full min-h-[400px]">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button type="button" onClick={onBack} variant="outline">
            Back
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Payment;
