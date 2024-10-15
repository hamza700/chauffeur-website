'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookingComponent from '../booking/booking-component';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[calc(100vh-80px)] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-background.jpeg"
        alt="Luxury Travel"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="scale-105" // Slight zoom effect
      />

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Experience Luxury Travel
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Elevate your journey with our premium chauffeur service
          </p>
        </motion.div>

        {/* Booking Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <BookingComponent />
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-secondary/20 rounded-full filter blur-3xl" />
    </section>
  );
};

export default HeroSection;
