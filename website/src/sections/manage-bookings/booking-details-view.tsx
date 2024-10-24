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

// Mock data for a single booking
const mockBookingDetails = {
  id: 'BK123456',
  date: '2023-06-15',
  time: '14:00',
  pickupLocation: 'Airport Terminal 1',
  dropoffLocation: 'Hilton Hotel Downtown',
  vehicleType: 'Business Class',
  status: 'Confirmed',
  customerName: 'John Doe',
  customerEmail: 'john.doe@example.com',
  customerPhone: '+1 234 567 8900',
  price: 150.0,
  driverName: 'Michael Smith',
  driverPhone: '+1 987 654 3210',
};

export default function BookingDetailsView() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  // In a real application, you would fetch the booking details using the bookingId
  const bookingDetails = mockBookingDetails;

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Booking Details
        </h1>
        <Card className="shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="text-3xl">
              Booking {bookingDetails.id}
            </CardTitle>
            <CardDescription className="text-primary-foreground">
              Status:{' '}
              <span className="font-semibold">{bookingDetails.status}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Car className="mr-2 h-6 w-6 text-primary" />
                  Trip Information
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Calendar className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Date:</span>
                    <span className="ml-2">{bookingDetails.date}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Clock className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Time:</span>
                    <span className="ml-2">{bookingDetails.time}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <MapPin className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">From:</span>
                    <span className="ml-2">
                      {bookingDetails.pickupLocation}
                    </span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <MapPin className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">To:</span>
                    <span className="ml-2">
                      {bookingDetails.dropoffLocation}
                    </span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Car className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Vehicle:</span>
                    <span className="ml-2">{bookingDetails.vehicleType}</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="mr-2 h-6 w-6 text-primary" />
                  Customer Information
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <User className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Name:</span>
                    <span className="ml-2">{bookingDetails.customerName}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Mail className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-2">{bookingDetails.customerEmail}</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Phone className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Phone:</span>
                    <span className="ml-2">{bookingDetails.customerPhone}</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            <Separator className="my-8" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2 h-6 w-6 text-primary" />
                Driver Information
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <User className="mr-3 h-5 w-5 text-primary" />
                  <span className="font-medium">Name:</span>
                  <span className="ml-2">{bookingDetails.driverName}</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Phone className="mr-3 h-5 w-5 text-primary" />
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">{bookingDetails.driverPhone}</span>
                </li>
              </ul>
            </motion.div>
            <Separator className="my-8" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2 h-6 w-6 text-primary" />
                Payment Information
              </h3>
              <p className="flex items-center text-gray-700">
                <CreditCard className="mr-3 h-5 w-5 text-primary" />
                <span className="font-medium">Total Price:</span>
                <span className="ml-2 text-xl font-bold text-primary">
                  ${bookingDetails.price.toFixed(2)}
                </span>
              </p>
            </motion.div>
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
                {bookingDetails.status === 'Confirmed' && (
                  <Button variant="destructive">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Cancel Booking
                  </Button>
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
