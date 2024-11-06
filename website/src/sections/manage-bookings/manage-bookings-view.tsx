'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/card';
import { paths } from '@/routes/paths';
import { getBookingRecord } from '@/auth/context/supabase/action';
import { useAuthContext } from '@/auth/hooks';

// Update the interface to match your database schema
interface Booking {
  id: string;
  order_number: string;
  date: string;
  time: string;
  pickup_location: string;
  dropoff_location: string;
  service_class: string;
  status: string;
}

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

export default function ManageBookingsView() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) return;

      try {
        const { data } = await getBookingRecord(user.id);
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);

  const filteredBookings = bookings.filter((booking) =>
    activeTab === 'upcoming'
      ? ['offers', 'confirmed'].includes(booking.status.toLowerCase())
      : booking.status.toLowerCase() === 'completed'
  );

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Manage Your Bookings
        </h1>

        <Card>
          <CardHeader>
            <Tabs
              defaultValue="upcoming"
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
                <TabsTrigger value="past">Past Bookings</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                <BookingsTable bookings={filteredBookings} type="upcoming" />
              </TabsContent>
              <TabsContent value="past">
                <BookingsTable bookings={filteredBookings} type="past" />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
}

interface BookingsTableProps {
  bookings: Booking[];
  type: 'upcoming' | 'past';
}

function BookingsTable({ bookings, type }: BookingsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Booking Ref</TableHead>
            <TableHead className="w-[120px]">Date</TableHead>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead className="min-w-[200px]">Pickup</TableHead>
            <TableHead className="min-w-[200px]">Dropoff</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                {booking.order_number}
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                  {booking.date}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                  {booking.time}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                  <span className="line-clamp-2">
                    {booking.pickup_location}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                  <span className="line-clamp-2">
                    {booking.dropoff_location}
                  </span>
                </div>
              </TableCell>
              <TableCell>{booking.service_class}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status.toLowerCase() === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status.toLowerCase() === 'offers'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {booking.status.toLowerCase() === 'confirmed' ? (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  ) : booking.status.toLowerCase() === 'offers' ? (
                    <AlertCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  )}
                  {getStatusDisplay(booking.status)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`${paths.manageBookings.root}/${booking.order_number}`}
                  passHref
                >
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
