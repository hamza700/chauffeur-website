'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import VehicleSelection from '@/components/booking/VehicleSelection';
import CustomerDetails from '@/components/booking/CustomerDetails';
import Payment from '@/components/booking/Payment';
import BookingSummaryCard from '@/components/booking/BookingSummaryCard';
import { Car, User, CreditCard } from 'lucide-react';

const steps = [
  { number: '01', icon: Car, label: 'Vehicle' },
  { number: '02', icon: User, label: 'Details' },
  { number: '03', icon: CreditCard, label: 'Payment' },
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    vehicle: null,
    customerDetails: null,
    paymentDetails: null,
    initialBookingDetails: null,
  });

  useEffect(() => {
    const initialBookingDetails = {
      type: searchParams.get('type'),
      pickupLocation: searchParams.get('pickupLocation'),
      dropoffLocation: searchParams.get('dropoffLocation'),
      date: searchParams.get('date'),
      time: searchParams.get('time'),
      duration: searchParams.get('duration'),
    };
    setBookingData((prev) => ({ ...prev, initialBookingDetails }));
  }, [searchParams]);

  const handleNext = (data: any) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

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
                <CustomerDetails onNext={handleNext} onBack={handleBack} />
              )}
              {currentStep === 2 && (
                <Payment onNext={handleNext} onBack={handleBack} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:w-1/3">
          <BookingSummaryCard bookingData={bookingData} />
        </div>
      </div>
    </div>
  );
}
