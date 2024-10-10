'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ConfirmationPage from '@/components/booking/ConfirmationPage';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingReference = searchParams.get('ref');

  // In a real application, you would fetch the booking details using the reference
  const mockBookingData = {
    bookingReference: bookingReference || 'Unknown',
    vehicle: 'Business Class',
    customerDetails: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    initialBookingDetails: {
      type: 'oneWay',
      pickupLocation: 'Airport',
      dropoffLocation: 'Hotel',
      date: '2023-06-01',
      time: '14:00',
    },
  };

  return <ConfirmationPage bookingData={mockBookingData} />;
}