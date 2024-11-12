'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Download,
  MapPin,
  Calendar,
  Clock,
  Users,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { paths } from '@/routes/paths';
import { useBooking } from '@/context/booking/booking-context';
import { useAuthContext } from '@/auth/hooks';
import { useRouter, useSearchParams } from '@/routes/hooks';
import { parsePhoneNumber } from 'react-phone-number-input';

const ConfirmationPage = () => {
  const { state, dispatch } = useBooking();
  const { authenticated, user } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<
    'success' | 'processing' | 'error' | null
  >(null);

  // Use bookingState instead of state for all the destructured values
  const {
    vehicle,
    initialBookingDetails,
    bookingReference,
    customerDetails,
    finalPrice,
    distanceData,
  } = state;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  let formattedPhoneNumber = customerDetails.phoneNumber;
  try {
    const phoneNumber = parsePhoneNumber(customerDetails.phoneNumber);
    if (phoneNumber) {
      formattedPhoneNumber = phoneNumber.format('E.164');
    }
  } catch (e) {
    console.warn('Could not parse phone number:', e);
  }

  const getVehicleImageName = (vehicle: string | null) => {
    if (!vehicle) return 'default-vehicle';
    switch (vehicle.toLowerCase()) {
      case 'business':
        return 'business-class';
      case 'first':
        return 'first-class';
      case 'van/suv':
        return 'van-suv';
      default:
        return 'default-vehicle';
    }
  };

  useEffect(() => {
    const checkSessionStatus = async () => {
      if (!sessionId) return;

      try {
        if (!user?.accessToken) {
          throw new Error('No access token available');
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/session-status?session_id=${sessionId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              order_number: bookingReference,
              date: initialBookingDetails.date,
              time: initialBookingDetails.time,
              hours: initialBookingDetails.duration,
              pickup_location: initialBookingDetails.pickupLocation,
              dropoff_location: initialBookingDetails.dropoffLocation,
              service_class: vehicle,
              total_amount: finalPrice,
              special_requests: customerDetails.specialRequests,
              distance: distanceData.distance,
              customer_id: user?.id,
              passengers: customerDetails.passengers,
              luggage: customerDetails.luggage,
              flight_number: customerDetails.flightNumber,
              customer_first_name: customerDetails.firstName,
              customer_last_name: customerDetails.lastName,
              customer_email: customerDetails.email,
              customer_phone_number: formattedPhoneNumber,
              estimated_duration: distanceData.estimatedDuration,
              booking_type: initialBookingDetails.type,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch session status');
        }

        const data = await response.json();

        if (data.status === 'complete') {
          setStatus('success');
        } else if (data.status === 'open') {
          setStatus('processing');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error checking session status:', error);
        setStatus('error');
      }
    };

    checkSessionStatus();
  }, [sessionId, state, user?.accessToken]);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        dispatch({ type: 'RESET_BOOKING' });
        router.push(paths.home);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  if (status === 'error' || status === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-primary/10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-center text-primary flex items-center justify-center">
                <AlertCircle className="mr-2 h-6 w-6 text-red-500" />
                Payment Incomplete
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                We&apos;re sorry, but your payment could not be processed at this time.
              </p>
              <p className="text-sm text-muted-foreground">
                Please check your payment details and try again, or contact our support team for assistance.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pt-4">
              <Link href={paths.booking.root} passHref>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Return to Booking
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CheckCircle className="w-24 h-24 text-primary mx-auto mb-6" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your luxury ride is booked and ready to go.
          </p>
        </div>

        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="text-2xl">Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-gray-600 mb-1">Booking Reference:</p>
                <p className="text-2xl font-semibold text-primary">
                  {bookingReference}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-gray-600 mb-1">Vehicle:</p>
                <p className="text-2xl font-semibold">{vehicle}</p>
              </motion.div>
              <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <MapPin className="w-5 h-5" />
                    <p>Pickup Location:</p>
                  </div>
                  <p className="text-lg font-medium">
                    {initialBookingDetails.pickupLocation}
                  </p>
                  {initialBookingDetails.type === 'chauffeur' &&
                    initialBookingDetails.dropoffLocation && (
                      <div className="mt-4">
                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                          <MapPin className="w-5 h-5" />
                          <p>Dropoff Location:</p>
                        </div>
                        <p className="text-lg font-medium">
                          {initialBookingDetails.dropoffLocation}
                        </p>
                      </div>
                    )}
                  {initialBookingDetails.type === 'hourly' &&
                    initialBookingDetails.duration && (
                      <div className="mt-4">
                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                          <Clock className="w-5 h-5" />
                          <p>Duration:</p>
                        </div>
                        <p className="text-lg font-medium">
                          {initialBookingDetails.duration} hours
                        </p>
                      </div>
                    )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Calendar className="w-5 h-5" />
                    <p>Date:</p>
                  </div>
                  <p className="text-lg font-medium">
                    {formatDate(initialBookingDetails.date)}
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Clock className="w-5 h-5" />
                      <p>Time:</p>
                    </div>
                    <p className="text-lg font-medium">
                      {initialBookingDetails.time}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="text-2xl">Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/2">
                <Image
                  src={`/images/${getVehicleImageName(vehicle)}.webp`}
                  alt={vehicle}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:w-1/2 p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-2">{vehicle}</h3>
                <p className="text-gray-600 mb-4">
                  Luxury transportation for your journey
                </p>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <p>Comfortable seating for up to 4 passengers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {authenticated ? (
            <Link href={paths.manageBookings.root} passHref>
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                Manage Booking
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          )}
          <Link href={paths.home} passHref>
            <Button variant="outline" className="w-full sm:w-auto">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
