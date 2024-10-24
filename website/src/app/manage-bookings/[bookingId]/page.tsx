import React from 'react';
import BookingDetailsView from '@/sections/manage-bookings/booking-details-view';
import { AuthGuard } from '@/auth/guard/auth-guard';
export default function BookingDetailsPage() {
  return (
    <AuthGuard>
      <BookingDetailsView />
    </AuthGuard>
  );
}
