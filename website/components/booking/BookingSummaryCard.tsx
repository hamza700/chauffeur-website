import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  MapPin,
  Calendar,
  Clock,
  Users,
  Briefcase,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingSummaryCardProps {
  bookingData: {
    vehicle: string | null;
    customerDetails: {
      firstName: string;
      lastName: string;
      email: string;
      passengers: number;
      luggage: number;
    } | null;
    paymentDetails: {
      cardNumber?: string;
    } | null;
    initialBookingDetails: {
      type: string | null;
      pickupLocation: string | null;
      dropoffLocation: string | null;
      date: string | null;
      time: string | null;
      duration: string | null;
    } | null;
  };
}

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  bookingData,
}) => {
  const { customerDetails, paymentDetails, initialBookingDetails } =
    bookingData;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="text-xl">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Booking Details</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" /> Type
                  </span>
                  <span className="font-medium">
                    {initialBookingDetails?.type || 'N/A'}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" /> Pickup
                  </span>
                  <span className="font-medium">
                    {initialBookingDetails?.pickupLocation || 'N/A'}
                  </span>
                </li>
                {initialBookingDetails?.type === 'oneWay' && (
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" /> Dropoff
                    </span>
                    <span className="font-medium">
                      {initialBookingDetails.dropoffLocation || 'N/A'}
                    </span>
                  </li>
                )}
                {initialBookingDetails?.type === 'hourly' && (
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" /> Duration
                    </span>
                    <span className="font-medium">
                      {initialBookingDetails.duration
                        ? `${initialBookingDetails.duration} hours`
                        : 'N/A'}
                    </span>
                  </li>
                )}
                <li className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" /> Date
                  </span>
                  <span className="font-medium">
                    {formatDate(initialBookingDetails?.date || 'N/A')}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" /> Time
                  </span>
                  <span className="font-medium">
                    {initialBookingDetails?.time || 'N/A'}
                  </span>
                </li>
              </ul>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Vehicle Information
              </h3>
              <p className="text-gray-600">{bookingData.vehicle || 'N/A'}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Customer Information
              </h3>
              {customerDetails ? (
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" /> Customer
                    </span>
                    <span className="font-medium">
                      {customerDetails.firstName} {customerDetails.lastName}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" /> Email
                    </span>
                    <a
                      href={`mailto:${customerDetails.email}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {customerDetails.email}
                    </a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" /> Passengers
                    </span>
                    <span className="font-medium">
                      {customerDetails.passengers}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" /> Luggage
                    </span>
                    <span className="font-medium">
                      {customerDetails.luggage}
                    </span>
                  </li>
                </ul>
              ) : (
                <p className="text-gray-600">No customer details available</p>
              )}
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Payment Information
              </h3>
              {paymentDetails && paymentDetails.cardNumber ? (
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <CreditCard className="w-4 h-4 mr-2" /> Card
                    </span>
                    <span className="font-medium">
                      **** **** **** {paymentDetails.cardNumber.slice(-4)}
                    </span>
                  </li>
                </ul>
              ) : (
                <p className="text-gray-600">No payment details available</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-gray-50 px-6 py-4">
          <p className="text-xs text-gray-500">
            Updated{' '}
            <time dateTime={new Date().toISOString()}>
              {formatDate(new Date().toISOString())}
            </time>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BookingSummaryCard;
