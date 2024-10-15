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
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';

interface CustomerDetailsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  onNext,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    onNext({ customerDetails: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <SignInButton mode="modal">
              <Button type="button" variant="outline" className="w-full">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button type="button" variant="outline" className="w-full">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
          <div className="flex items-center w-full">
            <Separator className="flex-grow max-w-[42%]" />
            <span className="px-4 text-sm text-gray-500 whitespace-nowrap">
              Or continue as guest
            </span>
            <Separator className="flex-grow max-w-[41%]" />
          </div>
        </div>
      </div>

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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message as string}
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
              onValueChange={(value) =>
                register('passengers').onChange({ target: { value } })
              }
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
              onValueChange={(value) =>
                register('luggage').onChange({ target: { value } })
              }
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
