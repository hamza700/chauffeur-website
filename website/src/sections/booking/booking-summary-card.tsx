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
  MapPin,
  Calendar,
  Clock,
  Users,
  Briefcase,
  Phone,
  Plane,
  MessageCircle,
  Car,
  PoundSterling,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingState } from '@/context/booking/booking-context';

interface BookingSummaryCardProps {
  bookingData: BookingState;
}

function hasValidCustomerDetails(
  customerDetails: BookingState['customerDetails']
) {
  if (!customerDetails) return false;

  return Object.values(customerDetails).some(
    (value) => value !== null && value !== undefined && value !== ''
  );
}

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  bookingData,
}) => {
  const {
    customerDetails,
    initialBookingDetails,
    distanceData,
    vehicle,
    finalPrice,
  } = bookingData;

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
            {initialBookingDetails && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Booking Details</h3>
                <ul className="space-y-4">
                  {initialBookingDetails.pickupLocation && (
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="flex items-center text-gray-600 shrink-0">
                        <MapPin className="w-4 h-4 mr-2" /> Pickup
                      </span>
                      <span className="font-medium text-right break-words max-w-[300px]">
                        {initialBookingDetails.pickupLocation}
                      </span>
                    </li>
                  )}
                  {initialBookingDetails.type === 'chauffeur' &&
                    initialBookingDetails.dropoffLocation && (
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <MapPin className="w-4 h-4 mr-2" /> Dropoff
                        </span>
                        <span className="font-medium text-right break-words max-w-[300px]">
                          {initialBookingDetails.dropoffLocation}
                        </span>
                      </li>
                    )}
                  {initialBookingDetails.type === 'hourly' &&
                    initialBookingDetails.duration && (
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <Clock className="w-4 h-4 mr-2" /> Duration
                        </span>
                        <span className="font-medium text-right">
                          {`${initialBookingDetails.duration} hours`}
                        </span>
                      </li>
                    )}
                  {initialBookingDetails.date && (
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="flex items-center text-gray-600 shrink-0">
                        <Calendar className="w-4 h-4 mr-2" /> Date
                      </span>
                      <span className="font-medium text-right">
                        {formatDate(initialBookingDetails.date)}
                      </span>
                    </li>
                  )}
                  {initialBookingDetails.time && (
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="flex items-center text-gray-600 shrink-0">
                        <Clock className="w-4 h-4 mr-2" /> Time
                      </span>
                      <span className="font-medium text-right">
                        {initialBookingDetails.time}
                      </span>
                    </li>
                  )}
                  {distanceData && (
                    <>
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <MapPin className="w-4 h-4 mr-2" /> Distance
                        </span>
                        <span className="font-medium text-right">
                          {distanceData.distance}
                        </span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <Clock className="w-4 h-4 mr-2" /> Estimated Duration
                        </span>
                        <span className="font-medium text-right">
                          {distanceData.estimatedDuration}
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {vehicle && finalPrice && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Vehicle Information
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="flex items-center text-gray-600 shrink-0">
                        <Car className="w-4 h-4 mr-2" /> Vehicle Type
                      </span>
                      <span className="font-medium text-right">{vehicle}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="flex items-center text-gray-600 shrink-0">
                        <PoundSterling className="w-4 h-4 mr-2" /> Final Price
                      </span>
                      <span className="font-medium text-right">
                        £{finalPrice.toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {customerDetails && hasValidCustomerDetails(customerDetails) && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Customer Information
                  </h3>
                  <ul className="space-y-4">
                    {customerDetails.firstName && customerDetails.lastName && (
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <Users className="w-4 h-4 mr-2" /> Customer
                        </span>
                        <span className="font-medium text-right">
                          {customerDetails.firstName} {customerDetails.lastName}
                        </span>
                      </li>
                    )}
                    {customerDetails.email && (
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <MapPin className="w-4 h-4 mr-2" /> Email
                        </span>
                        <a
                          href={`mailto:${customerDetails.email}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {customerDetails.email}
                        </a>
                      </li>
                    )}
                    {customerDetails.phoneNumber && (
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <Phone className="w-4 h-4 mr-2" /> Phone Number
                        </span>
                        <span className="font-medium text-right">
                          {customerDetails.phoneNumber}
                        </span>
                      </li>
                    )}
                    {customerDetails.passengers && (
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <Users className="w-4 h-4 mr-2" /> Passengers
                        </span>
                        <span className="font-medium text-right">
                          {customerDetails.passengers}
                        </span>
                      </li>
                    )}
                    {customerDetails.luggage && (
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <Briefcase className="w-4 h-4 mr-2" /> Luggage
                        </span>
                        <span className="font-medium text-right">
                          {customerDetails.luggage}
                        </span>
                      </li>
                    )}
                    {customerDetails.flightNumber && (
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <Plane className="w-4 h-4 mr-2" /> Flight Number
                        </span>
                        <span className="font-medium text-right">
                          {customerDetails.flightNumber}
                        </span>
                      </li>
                    )}
                    {customerDetails.specialRequests && (
                      <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="flex items-center text-gray-600 shrink-0">
                          <MessageCircle className="w-4 h-4 mr-2" /> Special
                          Requests
                        </span>
                        <span className="font-medium text-right">
                          {customerDetails.specialRequests}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </>
            )}
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
