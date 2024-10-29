'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/auth/hooks';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';

interface PaymentProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onNext, onBack }) => {
  const router = useRouter();
  const { authenticated, loading } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push(paths.auth.signIn);
    }
  }, [authenticated, loading, router]);

  const onSubmit = async (data: any) => {
    // Get stored customer details
    const storedDetails = sessionStorage.getItem('customerDetails');
    const customerDetails = storedDetails ? JSON.parse(storedDetails) : null;

    if (!customerDetails) {
      router.push('/booking/customer-details');
      return;
    }

    // Process payment with combined data
    onNext({
      paymentDetails: data,
      customerDetails,
    });

    // Clear stored details after successful submission
    sessionStorage.removeItem('customerDetails');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>

      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          {...register('cardNumber', {
            required: 'Card number is required',
            pattern: { value: /^[0-9]{16}$/, message: 'Invalid card number' },
          })}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.cardNumber.message as string}
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            placeholder="MM/YY"
            {...register('expiryDate', {
              required: 'Expiry date is required',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                message: 'Invalid expiry date',
              },
            })}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expiryDate.message as string}
            </p>
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            {...register('cvv', {
              required: 'CVV is required',
              pattern: { value: /^[0-9]{3,4}$/, message: 'Invalid CVV' },
            })}
          />
          {errors.cvv && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cvv.message as string}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="nameOnCard">Name on Card</Label>
        <Input
          id="nameOnCard"
          {...register('nameOnCard', { required: 'Name on card is required' })}
        />
        {errors.nameOnCard && (
          <p className="text-red-500 text-sm mt-1">
            {errors.nameOnCard.message as string}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline">
          Back
        </Button>
        <Button type="submit">Complete Booking</Button>
      </div>
    </form>
  );
};

export default Payment;
