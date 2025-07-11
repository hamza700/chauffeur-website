'use client';

import type {
  AuthError,
  AuthResponse,
  UserResponse,
  AuthTokenResponsePassword,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
  PostgrestError,
} from '@supabase/supabase-js';

import { paths } from '@/routes/paths';

import { supabase } from '@/lib/supabase';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
  options?: SignInWithPasswordCredentials['options'];
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  options?: SignUpWithPasswordCredentials['options'];
};

export type ResetPasswordParams = {
  email: string;
  options?: {
    redirectTo?: string;
    captchaToken?: string;
  };
};

export type UpdatePasswordParams = {
  password: string;
  options?: {
    emailRedirectTo?: string | undefined;
  };
};

export type VerifyOtpParams = {
  email: string;
  token: string;
};

export type ResendOtpParams = {
  email: string;
};

interface Booking {
  orderNumber: string;
  date: string;
  time: string;
  pickupLocation: string;
  dropoffLocation: string;
  serviceClass: string;
  totalAmount: number;
  status: string;
  specialRequests?: string;
  distance: string;
  estimatedDuration: string;
  customerId: string;
  passengers: number;
  luggage: number;
  flightNumber: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  bookingType: string;
}

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({
  email,
  password,
}: SignInParams): Promise<AuthTokenResponsePassword> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw error;
  }

  if (data?.user?.user_metadata?.roles !== 'customer') {
    await supabase.auth.signOut();
    throw new Error('Access denied. Only customers can sign in.');
  }

  return { data, error };
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
}: SignUpParams): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: undefined,
      data: {
        display_name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        roles: 'customer',
      },
    },
  });

  if (error) {
    console.error(error);
    throw error;
  }

  if (!data?.user?.identities?.length) {
    throw new Error('This user already exists');
  }

  return { data, error };
};

/** **************************************
 * Verify OTP
 *************************************** */
export const verifyOtp = async ({
  email,
  token,
}: VerifyOtpParams): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Resend OTP
 *************************************** */
export const resendOtp = async ({
  email,
}: ResendOtpParams): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: undefined,
    },
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<{
  error: AuthError | null;
}> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw error;
  }

  return { error };
};

/** **************************************
 * Reset password
 *************************************** */
export const resetPassword = async ({
  email,
}: ResetPasswordParams): Promise<
  { data: {}; error: null } | { data: null; error: AuthError }
> => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${paths.auth.updatePassword}`,
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Update password
 *************************************** */
export const updatePassword = async ({
  password,
}: UpdatePasswordParams): Promise<UserResponse> => {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Update user metadata
 *************************************** */
interface UpdateUserMetadataParams {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export const updateUserMetadata = async ({
  firstName,
  lastName,
  phoneNumber,
}: UpdateUserMetadataParams): Promise<UserResponse> => {
  const { data: currentUser } = await supabase.auth.getUser();

  if (!currentUser.user) throw new Error('No user found');

  const currentMetadata = currentUser.user.user_metadata;

  const { data, error } = await supabase.auth.updateUser({
    data: {
      ...currentMetadata,
      ...(firstName && { first_name: firstName }),
      ...(lastName && { last_name: lastName }),
      ...(phoneNumber && { phone_number: phoneNumber }),
      ...(firstName || lastName
        ? {
            display_name: `${firstName || currentMetadata.first_name} ${
              lastName || currentMetadata.last_name
            }`,
          }
        : {}),
    },
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Add a role
 *************************************** */
export const addUserRole = async (
  userId: string,
  role: string
): Promise<{ data: any[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('user_roles')
    .insert([{ user_id: userId, role }])
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Insert customer record
 *************************************** */
export const insertCustomerRecord = async (
  user: User
): Promise<{ data: any[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('customers')
    .insert([
      {
        id: user.id,
        email: user.email,
        first_name: user.user_metadata.first_name,
        last_name: user.user_metadata.last_name,
        phone_number: user.user_metadata.phone_number,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Get customer record
 *************************************** */
export const getCustomerRecord = async (
  userId: string
): Promise<{ data: any[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('customers')
    .select()
    .eq('id', userId);

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Update customer record
 *************************************** */
interface UpdateCustomerData {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

export const updateCustomerRecord = async (
  userId: string,
  data: UpdateCustomerData
): Promise<{ data: any[] | null; error: PostgrestError | null }> => {
  const { data: result, error } = await supabase
    .from('customers')
    .update({
      ...(data.first_name && { first_name: data.first_name }),
      ...(data.last_name && { last_name: data.last_name }),
      ...(data.phone_number && { phone_number: data.phone_number }),
    })
    .eq('id', userId)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return { data: result, error };
};

/** **************************************
 * Insert booking record
 *************************************** */
export const insertBookingRecord = async (
  booking: Booking
): Promise<{ data: any[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        order_number: booking.orderNumber,
        date: booking.date,
        time: booking.time,
        pickup_location: booking.pickupLocation,
        dropoff_location: booking.dropoffLocation,
        service_class: booking.serviceClass,
        total_amount: booking.totalAmount,
        status: booking.status,
        special_requests: booking.specialRequests,
        distance: booking.distance,
        estimated_duration: booking.estimatedDuration,
        booking_type: booking.bookingType,
        customer_id: booking.customerId,
        passengers: booking.passengers,
        luggage: booking.luggage,
        flight_number: booking.flightNumber,
        customer_first_name: booking.customerFirstName,
        customer_last_name: booking.customerLastName,
        customer_email: booking.customerEmail,
        customer_phone_number: booking.customerPhoneNumber,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Get booking record
 *************************************** */
export const getBookingRecord = async (
  userId: string
): Promise<{ data: any[] | null; error: PostgrestError | null }> => {
  const { data: availableJobs, error: availableJobsError } = await supabase
    .from('available_jobs')
    .select()
    .eq('customer_id', userId);

  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select()
    .eq('customer_id', userId);

  const error = availableJobsError || bookingsError;
  if (error) {
    console.error(error);
    throw error;
  }

  // Transform available jobs to include a virtual status
  const transformedAvailableJobs = (availableJobs || []).map(job => ({
    ...job,
    status: 'offers' as const
  }));

  const data = [...transformedAvailableJobs, ...(bookings || [])];
  return { data, error: null };
};

/** **************************************
 * Delete booking record
 *************************************** */
export const deleteBookingRecord = async (
  bookingId: string
): Promise<{ data: any[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};
