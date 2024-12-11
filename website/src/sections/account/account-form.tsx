'use client';

import { useState, useEffect, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { parsePhoneNumber } from 'react-phone-number-input';
import { ReloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Edit2, Lock } from 'lucide-react';
import {
  getCustomerRecord,
  updateCustomerRecord,
  updateUserMetadata,
} from '@/auth/context/supabase/action';
import { PhoneInput } from '@/sections/phone/phone-input';
import { useAuthContext } from '@/auth/hooks';
import { paths } from '@/routes/paths';
import { useRouter } from '@/routes/hooks';

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: 'Please enter a valid phone number.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function AccountForm() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthContext();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
  });

  const fetchCustomerData = useCallback(async (retryCount = 0) => {
    if (!user?.id) {
      if (retryCount < 3) {
        setTimeout(() => fetchCustomerData(retryCount + 1), 1000);
        return;
      }
      return;
    }

    try {
      const { data, error } = await getCustomerRecord(user.id);
      if (error) throw error;

      if (data?.[0]) {
        // Format the phone number to E.164 format
        let formattedPhoneNumber = data[0].phone_number;
        try {
          // Try to parse and format the phone number
          const phoneNumber = parsePhoneNumber(data[0].phone_number);
          if (phoneNumber) {
            formattedPhoneNumber = phoneNumber.format('E.164');
          }
        } catch (e) {
          console.warn('Could not parse phone number:', e);
        }

        const customerData = {
          firstName: data[0].first_name,
          lastName: data[0].last_name,
          phoneNumber: formattedPhoneNumber,
          email: data[0].email,
        };

        // Reset form with fetched data
        form.reset(customerData);
      }
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your profile information.',
        variant: 'destructive',
      });
    }
  }, [user?.id, form]);

  useEffect(() => {
    fetchCustomerData();
    
    // Optional: Set up periodic refresh
    const refreshInterval = setInterval(() => {
      fetchCustomerData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, [fetchCustomerData]);

  async function onSubmit(data: ProfileFormValues) {
    if (!user?.id) return;
    setIsSubmitting(true);

    try {
      // Ensure phone number is in E.164 format before saving
      let formattedPhoneNumber = data.phoneNumber;
      try {
        const phoneNumber = parsePhoneNumber(data.phoneNumber);
        if (phoneNumber) {
          formattedPhoneNumber = phoneNumber.format('E.164');
        }
      } catch (e) {
        console.warn('Could not parse phone number:', e);
      }

      await updateUserMetadata({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: formattedPhoneNumber,
      });

      const mappedData = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: formattedPhoneNumber,
      };

      const { error } = await updateCustomerRecord(user.id, mappedData);
      if (error) throw error;

      toast({
        title: 'Profile updated successfully',
        description: 'Your changes have been saved.',
        variant: 'success',
        duration: 3000,
      });
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to update customer data:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your profile.',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-primary/5 to-primary/10 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Account Information
        </h1>

        <Card className="shadow-lg mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-primary">
                Personal Information
              </CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Input {...field} />
                          ) : (
                            <div className="p-2 border rounded-md">
                              {field.value}
                            </div>
                          )}
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
                          {isEditing ? (
                            <Input {...field} />
                          ) : (
                            <div className="p-2 border rounded-md">
                              {field.value}
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <PhoneInput {...field} onChange={field.onChange} />
                        ) : (
                          <div className="p-2 border rounded-md">
                            {field.value}
                          </div>
                        )}
                      </FormControl>
                      <FormDescription>
                        Enter your phone number with country code.
                      </FormDescription>
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
                        <div className="p-2 border rounded-md bg-gray-100">
                          {field.value}
                        </div>
                      </FormControl>
                      <FormDescription>
                        This email will be used for account-related
                        communications.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isEditing && (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Saving changes...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              Password
            </CardTitle>
            <CardDescription>Manage your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={paths.auth.resetPassword} className="w-full block">
              <Button className="w-full">
                <Lock className="mr-2 h-4 w-4" /> Change Password
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
