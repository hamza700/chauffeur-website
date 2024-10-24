'use client';

import SignUp from '@/sections/auth/sign-up';
import { GuestGuard } from '@/auth/guard/guest-guard';

export default function Page() {
  return (
    <GuestGuard>
      <SignUp />
    </GuestGuard>
  );
}
