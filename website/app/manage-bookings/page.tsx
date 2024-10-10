'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
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
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for bookings (unchanged)
const mockBookings = [
  {
    id: 'BK123456',
    date: '2023-06-15',
    time: '14:00',
    pickupLocation: 'Airport',
    dropoffLocation: 'Hotel',
    vehicleType: 'Business Class',
    status: 'Confirmed',
  },
  {
    id: 'BK789012',
    date: '2023-06-20',
    time: '10:00',
    pickupLocation: 'Hotel',
    dropoffLocation: 'Conference Center',
    vehicleType: 'First Class',
    status: 'Completed',
  },
  // Add more mock bookings as needed
];

export default function ManageBookingsPage() {
  const { isSignedIn, user } = useUser();
  const [activeTab, setActiveTab] = useState('upcoming');

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
            <CardDescription>You need to be signed in to view your bookings.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredBookings = mockBookings.filter((booking) =>
    activeTab === 'upcoming'
      ? booking.status === 'Confirmed'
      : booking.status === 'Completed'
  );

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Manage Your Bookings
        </h1>

        <Card>
          <CardHeader>
            <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
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
  bookings: typeof mockBookings;
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
            <TableHead>Date & Time</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Dropoff</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  {booking.date}
                  <Clock className="ml-4 mr-2 h-4 w-4" />
                  {booking.time}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  {booking.pickupLocation}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  {booking.dropoffLocation}
                </div>
              </TableCell>
              <TableCell>{booking.vehicleType}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {booking.status === 'Confirmed' ? (
                    <AlertCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  )}
                  {booking.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/manage-bookings/${booking.id}`} passHref>
                  <Button variant="outline" size="sm" className="mr-2">
                    View Details
                  </Button>
                </Link>
                {type === 'upcoming' && (
                  <Button variant="destructive" size="sm">
                    Cancel
                  </Button>
                )}
                {type === 'past' && (
                  <Button variant="secondary" size="sm">
                    Rebook
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}