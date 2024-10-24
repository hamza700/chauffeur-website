import React from 'react';
import ManageBookingsView from '@/sections/manage-bookings/manage-bookings-view';
import { AuthGuard } from '@/auth/guard/auth-guard';

export default function ManageBookingsPage() {
  return (
    <AuthGuard>
      <ManageBookingsView />
    </AuthGuard>
  );
}
