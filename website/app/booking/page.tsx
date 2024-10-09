'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import VehicleSelection from '@/components/booking/VehicleSelection';
import CustomerDetails from '@/components/booking/CustomerDetails';
import Payment from '@/components/booking/Payment';
import BookingSummaryCard from '@/components/booking/BookingSummaryCard';

const steps = [
  { number: '01', icon: 'car', label: 'Vehicle' },
  { number: '02', icon: 'user', label: 'Details' },
  { number: '03', icon: 'credit-card', label: 'Payment' },
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
    // Extract booking details from URL parameters
    const initialBookingDetails = {
      type: searchParams.get('type'),
      pickupLocation: searchParams.get('pickupLocation'),
      dropoffLocation: searchParams.get('dropoffLocation'),
      date: searchParams.get('date'),
      time: searchParams.get('time'),
      duration: searchParams.get('duration'),
    };
    setBookingData(prev => ({ ...prev, initialBookingDetails }));
  }, [searchParams]);

  const handleNext = (data: any) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStepIcon = (icon: string) => {
    switch (icon) {
      case 'car':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
            <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
            <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
          </svg>
        );
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
            <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Complete Your Booking</h1>
      
      <div className="mb-8">
        <ol className="flex items-start justify-between w-full">
          {steps.map((step, index) => (
            <li key={index} className="flex flex-col items-start w-full px-2">
              <div className={`flex items-center w-full ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-white border-2 border-gray-400'
                }`}>
                  <div className={`w-6 h-6 ${index <= currentStep ? 'text-white' : 'text-gray-400'}`}>
                    {renderStepIcon(step.icon)}
                  </div>
                </div>
                <span className="flex-grow text-center text-base font-bold mx-2">{step.label}</span>
                <span className="flex-shrink-0 text-lg font-bold">{step.number}</span>
              </div>
              <div className={`w-full h-0.5 mt-4 ${
                index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}></div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && <VehicleSelection onNext={handleNext} />}
              {currentStep === 1 && <CustomerDetails onNext={handleNext} onBack={handleBack} />}
              {currentStep === 2 && <Payment onNext={handleNext} onBack={handleBack} />}
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