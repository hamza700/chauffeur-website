'use client';

import { BookingProvider } from '@/context/booking/booking-context';

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BookingProvider>{children}</BookingProvider>;
}
