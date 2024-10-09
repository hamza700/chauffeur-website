import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";

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

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({ bookingData }) => {
  const { customerDetails, paymentDetails, initialBookingDetails } = bookingData;

  // Function to format date consistently on both server and client
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-lg">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Booking Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Type</span>
              <span>{initialBookingDetails?.type || 'N/A'}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Pickup</span>
              <span>{initialBookingDetails?.pickupLocation || 'N/A'}</span>
            </li>
            {initialBookingDetails?.type === 'oneWay' && (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Dropoff</span>
                <span>{initialBookingDetails.dropoffLocation || 'N/A'}</span>
              </li>
            )}
            {initialBookingDetails?.type === 'hourly' && (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{initialBookingDetails.duration ? `${initialBookingDetails.duration} hours` : 'N/A'}</span>
              </li>
            )}
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Date</span>
              <span>{formatDate(initialBookingDetails?.date || 'N/A')}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Time</span>
              <span>{initialBookingDetails?.time || 'N/A'}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Vehicle Information</div>
          <div className="text-muted-foreground">{bookingData.vehicle || 'N/A'}</div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          {customerDetails ? (
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Customer</dt>
                <dd>{customerDetails.firstName} {customerDetails.lastName}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${customerDetails.email}`}>{customerDetails.email}</a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Passengers</dt>
                <dd>{customerDetails.passengers}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Luggage</dt>
                <dd>{customerDetails.luggage}</dd>
              </div>
            </dl>
          ) : (
            <div className="text-muted-foreground">No customer details available</div>
          )}
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          {paymentDetails && paymentDetails.cardNumber ? (
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Card
                </dt>
                <dd>**** **** **** {paymentDetails.cardNumber.slice(-4)}</dd>
              </div>
            </dl>
          ) : (
            <div className="text-muted-foreground">No payment details available</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime={new Date().toISOString()}>{formatDate(new Date().toISOString())}</time>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookingSummaryCard;