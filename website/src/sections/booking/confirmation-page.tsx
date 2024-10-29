import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Download,
  MapPin,
  Calendar,
  Clock,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { paths } from '@/routes/paths';

interface ConfirmationPageProps {
  bookingData: {
    bookingReference: string;
    vehicle: string;
    customerDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      passengers: number;
      luggage: number;
      flightNumber: string;
      specialRequests?: string;
    };
    initialBookingDetails: {
      type: string;
      pickupLocation: string;
      dropoffLocation?: string;
      date: string;
      time: string;
      duration?: string;
    };
  };
  isSignedIn: boolean;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  bookingData,
  isSignedIn,
}) => {
  const { bookingReference, vehicle, initialBookingDetails } =
    bookingData;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getVehicleImageName = (vehicle: string) => {
    switch (vehicle.toLowerCase()) {
      case 'business class':
        return 'business-class';
      case 'first class':
        return 'first-class';
      case 'van/suv':
        return 'van-suv';
      default:
        return 'default-vehicle';
    }
  };

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
                  {initialBookingDetails.type === 'oneWay' &&
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
          {isSignedIn ? (
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
