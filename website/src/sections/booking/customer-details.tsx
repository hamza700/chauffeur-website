'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CustomerDetailsProps {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    passengers?: number;
    luggage?: number;
    flightNumber?: string;
    specialRequests?: string;
  };
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  onNext,
  onBack,
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    onNext({ customerDetails: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message as string}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message as string}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            {...register('phoneNumber', {
              required: 'Phone number is required',
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message as string}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Options</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="passengers">Total Passengers</Label>
            <Select
              defaultValue={defaultValues?.passengers?.toString()}
              onValueChange={(value) => {
                setValue('passengers', parseInt(value));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select passengers" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.passengers && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passengers.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="luggage">Total Luggage</Label>
            <Select
              defaultValue={defaultValues?.luggage?.toString()}
              onValueChange={(value) => {
                setValue('luggage', parseInt(value));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select luggage" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.luggage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.luggage.message as string}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <Label htmlFor="flightNumber">Flight Number</Label>
            <Input
              id="flightNumber"
              placeholder="e.g., BA1234"
              {...register('flightNumber', {
                required: 'Flight number is required',
                pattern: {
                  value: /^[A-Z0-9]{2,8}$/i,
                  message: 'Please enter a valid flight number',
                },
              })}
            />
            {errors.flightNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.flightNumber.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <textarea
            id="specialRequests"
            {...register('specialRequests')}
            className="w-full p-2 border rounded resize-none h-24"
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
  );
};

export default CustomerDetails;
