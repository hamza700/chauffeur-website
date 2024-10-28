'use client';

import { AuthGuard } from '@/auth/guard/auth-guard';
import { AccountForm } from '@/sections/account/account-form';

export default function AccountPage() {
  return (
    <AuthGuard>
      <AccountForm />
    </AuthGuard>
  );
}
