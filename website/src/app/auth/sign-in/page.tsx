'use client';

import SignIn from '@/sections/auth/sign-in';
import { GuestGuard } from '@/auth/guard/guest-guard';

export default function Page() {
  return (
    <GuestGuard>
      <SignIn />
    </GuestGuard>
  );
}
