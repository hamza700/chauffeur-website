'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  Phone,
  Mail,
  CreditCard,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { paths } from '@/routes/paths';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  getBookingRecord,
  deleteBookingRecord,
} from '@/auth/context/supabase/action';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { useAuthContext } from '@/auth/hooks';

function getStatusDisplay(status: string) {
  switch (status.toLowerCase()) {
    case 'offers':
      return 'Not Confirmed Yet';
    case 'confirmed':
      return 'Confirmed';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
}

export default function BookingDetailsView() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookingDetails = useCallback(async (retryCount = 0) => {
    if (!user?.id) {
      if (retryCount < 3) {
        setTimeout(() => fetchBookingDetails(retryCount + 1), 1000);
        return;
      }
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await getBookingRecord(user.id);
      const currentBooking = data?.find(
        (b: any) => b.order_number === params.bookingId
      );
      setBooking(currentBooking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch booking details',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, params.bookingId]);

  useEffect(() => {
    fetchBookingDetails();
    
    // Optional: Set up periodic refresh
    const refreshInterval = setInterval(() => {
      fetchBookingDetails();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, [fetchBookingDetails]);

  const handleCancelBooking = async () => {
    try {
      await deleteBookingRecord(booking.id);
      toast({
        title: 'Booking Cancelled',
        description: 'Your booking has been successfully cancelled',
      });
      router.push(paths.manageBookings.root);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to cancel booking',
      });
    }
  };

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Booking not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Booking Details
        </h1>
        <Card className="shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="text-3xl">
              Booking {booking.order_number}
            </CardTitle>
            <CardDescription className="text-primary-foreground text-lg">
              Status:{' '}
              <span className="font-semibold">
                {getStatusDisplay(booking.status)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {/* Trip Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4">Trip Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Calendar className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium w-20">Date:</span>
                    <span className="ml-2">{booking.date}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Clock className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium w-20">Time:</span>
                    <span className="ml-2">{booking.time}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-medium w-20">From:</span>
                    <span className="ml-2 flex-1">
                      {booking.pickup_location}
                    </span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="font-medium w-20">To:</span>
                    <span className="ml-2 flex-1">
                      {booking.dropoff_location}
                    </span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Car className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium w-20">Vehicle:</span>
                    <span className="ml-2">{booking.service_class}</span>
                  </li>
                </ul>
              </motion.div>

              <Separator />

              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Customer Information
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <User className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium w-20">Name:</span>
                    <span className="ml-2">
                      {booking.customer_first_name} {booking.customer_last_name}
                    </span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Mail className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium w-20">Email:</span>
                    <span className="ml-2">{booking.customer_email}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Phone className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium w-20">Phone:</span>
                    <span className="ml-2">
                      {booking.customer_phone_number}
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Driver Information - Only show if status is confirmed or completed */}
              {(booking.status.toLowerCase() === 'confirmed' ||
                booking.status.toLowerCase() === 'completed') && (
                <>
                  <Separator />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      Driver Information
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-700">
                        <User className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium w-20">Name:</span>
                        <span className="ml-2">{booking.driver_name}</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <Phone className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium w-20">Phone:</span>
                        <span className="ml-2">
                          {booking.driver_phone_number}
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                </>
              )}

              <Separator />

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Payment Information
                </h3>
                <p className="flex items-center text-gray-700">
                  <CreditCard className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium w-20">Total Price:</span>
                  <span className="ml-2 text-xl font-bold text-primary">
                    £{booking.total_amount}
                  </span>
                </p>
              </motion.div>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-4 sm:space-y-0">
              <Button variant="outline" asChild>
                <Link href={paths.manageBookings.root}>
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Bookings
                  </span>
                </Link>
              </Button>
              <div className="space-x-2">
                {(booking.status.toLowerCase() === 'offers' ||
                  booking.status.toLowerCase() === 'confirmed') && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Cancel Booking
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          cancel your booking.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelBooking}>
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button>
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
