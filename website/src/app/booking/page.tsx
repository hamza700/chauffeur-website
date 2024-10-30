'use client';

import { BookingViewPage } from '@/sections/booking/view/booking-view-page';
import { BookingGuard } from '@/auth/guard/booking-guard';

export default function BookingPage() {
  return (
    <BookingGuard>
      <BookingViewPage />
    </BookingGuard>
  );
}
