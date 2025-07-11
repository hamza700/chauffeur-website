'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from '@/routes/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import VehicleSelection from '@/sections/booking/vehicle-selection';
import CustomerDetails from '@/sections/booking/customer-details';
import Payment from '@/sections/booking/payment';
import BookingSummaryCard from '@/sections/booking/booking-summary-card';
import { Car, User, CreditCard, LogIn } from 'lucide-react';
import { useAuthContext } from '@/auth/hooks';
import { paths } from '@/routes/paths';
import { useBooking } from '@/context/booking/booking-context';

const getSteps = (authenticated: boolean) => [
  { number: '01', icon: Car, label: 'Vehicle' },
  ...(authenticated ? [] : [{ number: '1.5', icon: LogIn, label: 'Login' }]),
  { number: '02', icon: User, label: 'Details' },
  { number: '03', icon: CreditCard, label: 'Payment' },
];

interface BookingData {
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
    bookingReference: string;
  };
  initialBookingDetails: {
    type: string;
    pickupLocation: string;
    dropoffLocation?: string;
    date: string;
    time: string;
    duration: string;
  };
  distanceData: {
    distance?: string;
    estimatedDuration?: string;
  };
}

export function BookingViewPage() {
  const { state, dispatch } = useBooking();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { authenticated } = useAuthContext();
  const steps = getSteps(authenticated);

  useEffect(() => {
    if (currentStep === 1 && !authenticated) {
      const currentUrl = window.location.pathname + window.location.search;
      sessionStorage.setItem('bookingReturnUrl', currentUrl);
    }
  }, [currentStep, authenticated]);

  const handleNext = async (data: Partial<BookingData>) => {
    // Handle vehicle selection first
    if (currentStep === 0 && data.vehicle) {
      dispatch({ type: 'SET_VEHICLE', payload: data.vehicle });

      // Check authentication after saving vehicle data
      if (!authenticated) {
        sessionStorage.setItem('selectedVehicle', JSON.stringify(data.vehicle));
        const currentUrl = window.location.pathname + window.location.search;
        sessionStorage.setItem('bookingReturnUrl', currentUrl);
        router.push(
          `${paths.auth.signIn}?returnTo=${encodeURIComponent(currentUrl)}`
        );
        return;
      }
    }

    // Handle customer details
    if (currentStep === 1 && data.customerDetails) {
      dispatch({
        type: 'SET_CUSTOMER_DETAILS',
        payload: data.customerDetails,
      });
    }

    // Proceed to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Restore vehicle selection if returning from auth
  useEffect(() => {
    const storedVehicle = sessionStorage.getItem('selectedVehicle');
    if (storedVehicle && authenticated) {
      const vehicle = JSON.parse(storedVehicle);
      dispatch({ type: 'SET_VEHICLE', payload: vehicle });
      sessionStorage.removeItem('selectedVehicle');
    }
  }, [authenticated, dispatch]);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Complete Your Booking
      </motion.h1>

      <div className="mb-12">
        <ol className="flex items-center justify-between w-full">
          {steps.map((step, index) => (
            <li key={index} className="flex flex-col items-center w-full">
              <motion.div
                className={`flex items-center justify-center w-16 h-16 rounded-full ${
                  index <= currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {React.createElement(step.icon, { className: 'w-8 h-8' })}
              </motion.div>
              <motion.span
                className={`mt-2 text-sm font-medium ${
                  index <= currentStep ? 'text-primary' : 'text-gray-500'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                {step.label}
              </motion.span>
              {index < steps.length - 1 && (
                <div className="w-full flex items-center mt-4">
                  <div
                    className={`flex-grow h-1 ${
                      index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  ></div>
                  <div className="w-2"></div>
                </div>
              )}
              {index === steps.length - 1 && (
                <div
                  className={`w-full h-1 mt-4 ${
                    index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {currentStep === 0 && <VehicleSelection onNext={handleNext} />}
              {currentStep === 1 && (
                <CustomerDetails
                  onNext={handleNext}
                  onBack={handleBack}
                  defaultValues={state.customerDetails}
                />
              )}
              {currentStep === 2 && <Payment onBack={handleBack} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:w-1/3">
          <BookingSummaryCard bookingData={state} />
        </div>
      </div>
    </div>
  );
}
