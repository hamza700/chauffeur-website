import React from 'react';
import Image from 'next/image';
import BookingComponent from '../booking/BookingComponent';
const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[calc(100vh-80px)] min-h-[600px]">
      {/* Background Image */}
      <Image
        src="/images/hero-background.jpeg"
        alt="Luxury Travel"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-6">
          Experience Luxury Travel
        </h1>
        <p className="text-xl sm:text-2xl text-white text-center mb-8">
          Book your premium chauffeur service today
        </p>
        
        {/* Booking Component */}
        <BookingComponent />
      </div>
    </section>
  );
};

export default HeroSection;