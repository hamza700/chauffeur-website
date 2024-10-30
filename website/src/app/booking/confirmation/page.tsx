'use client';

import React from 'react';
import ConfirmationPage from '@/sections/booking/confirmation-page';
import { BookingGuard } from '@/auth/guard/booking-guard';

export default function BookingConfirmationPage() {
  return (
    <BookingGuard requireReference={true}>
      <ConfirmationPage />;
    </BookingGuard>
  );
}
