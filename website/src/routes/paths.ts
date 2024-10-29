export const paths = {
  home: '/',
  booking: {
    root: '/booking',
    confirmation: '/booking/confirmation',
  },
  faq: {
    root: '/faq',
    category: (category: string) => `/faq/${category}`,
  },
  manageBookings: {
    root: '/manage-bookings',
    details: (bookingId: string) => `/manage-bookings/${bookingId}`,
  },
  account: '/account',
  partnerWithUs: '/partner-with-us',
  services: {
    chauffeur: '/services/chauffeur',
    hourlyRates: '/services/hourly-rates',
  },
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password',
    updatePassword: '/auth/update-password',
    // confirmation: '/auth/confirmation',
    verify: '/auth/verify',
  },
  privacy: {
    root: '/privacy-policy',
  },
  terms: {
    root: '/terms-and-conditions',
  },
};
