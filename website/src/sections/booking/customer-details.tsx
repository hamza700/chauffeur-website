'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuthContext } from '@/auth/hooks';
import { paths } from '@/routes/paths';
import { useRouter } from '@/routes/hooks';
import { useBooking } from '@/context/booking/booking-context';
import { PhoneInput } from '@/sections/phone/phone-input';

// Schema definition
const customerDetailsSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  passengers: z.number().min(1).max(6),
  luggage: z.number().min(0).max(5),
  flightNumber: z.string().regex(/^[A-Z0-9]{2,8}$/i, {
    message: 'Please enter a valid flight number',
  }),
  specialRequests: z.string().optional(),
});

type CustomerDetailsFormValues = z.infer<typeof customerDetailsSchema>;

interface CustomerDetailsProps {
  onNext: (data: CustomerDetailsFormValues) => void;
  onBack: () => void;
  defaultValues?: Partial<CustomerDetailsFormValues>;
}

export function CustomerDetails({
  onNext,
  onBack,
  defaultValues = {},
}: CustomerDetailsProps) {
  const router = useRouter();
  const { authenticated, user } = useAuthContext();
  const [bookingType, setBookingType] = useState<'self' | 'other'>('self');
  const { dispatch } = useBooking();

  const form = useForm<CustomerDetailsFormValues>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: {
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      email: defaultValues?.email || '',
      phoneNumber: defaultValues?.phoneNumber || '',
      passengers: defaultValues?.passengers,
      luggage: defaultValues?.luggage,
      flightNumber: defaultValues?.flightNumber || '',
      specialRequests: defaultValues?.specialRequests || '',
    },
  });

  // Handle booking type change
  const handleBookingTypeChange = (type: 'self' | 'other') => {
    setBookingType(type);

    if (type === 'self' && user) {
      form.reset({
        firstName: user.user_metadata.first_name || '',
        lastName: user.user_metadata.last_name || '',
        email: user.email || '',
        phoneNumber: user.user_metadata.phone_number || '',
        passengers: defaultValues?.passengers,
        luggage: defaultValues?.luggage,
        flightNumber: defaultValues?.flightNumber || '',
        specialRequests: defaultValues?.specialRequests || '',
      });
    } else {
      form.reset({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        passengers: undefined,
        luggage: undefined,
        flightNumber: defaultValues?.flightNumber || '',
        specialRequests: '',
      });
    }
  };

  // Initialize form with user data if booking type is 'self'
  useEffect(() => {
    if (bookingType === 'self' && user) {
      form.reset({
        firstName: user.user_metadata.first_name || '',
        lastName: user.user_metadata.last_name || '',
        email: user.email || '',
        phoneNumber: user.user_metadata.phone_number || '',
        passengers: defaultValues?.passengers,
        luggage: defaultValues?.luggage,
        flightNumber: defaultValues?.flightNumber || '',
        specialRequests: defaultValues?.specialRequests || '',
      });
    }
  }, [user, bookingType, form, defaultValues]);

  const onSubmit = (data: CustomerDetailsFormValues) => {
    if (!authenticated) {
      const currentUrl = window.location.pathname + window.location.search;
      sessionStorage.setItem('bookingReturnUrl', currentUrl);
      router.push(
        `${paths.auth.signIn}?returnTo=${encodeURIComponent(currentUrl)}`
      );
      return;
    }

    dispatch({ type: 'SET_CUSTOMER_DETAILS', payload: data });
    onNext(data);
  };

  return (
    <Form {...form}>
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">Customer Details</h2>
        <div className="space-y-4">
          <FormLabel>Booking Type</FormLabel>
          <div className="flex space-x-4">
            <Button
              type="button"
              variant={bookingType === 'self' ? 'default' : 'outline'}
              onClick={() => handleBookingTypeChange('self')}
              className="flex-1"
            >
              Booking for Myself
            </Button>
            <Button
              type="button"
              variant={bookingType === 'other' ? 'default' : 'outline'}
              onClick={() => handleBookingTypeChange('other')}
              className="flex-1"
            >
              Booking for Someone Else
            </Button>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Passengers</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select passengers" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="luggage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Luggage</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select luggage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="flightNumber"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Flight Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., BA1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any special requests..."
                        className="resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" onClick={onBack} variant="outline">
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </Form>
  );
}

export default CustomerDetails;
