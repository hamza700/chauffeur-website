'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import DownloadButtons from './download-buttons';

const DownloadApp: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="lg:w-1/2 mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Experience Luxury on the Go
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Elevate your travel experience with our mobile app. Book premium
              rides, manage your trips, and enjoy seamless luxury transportation
              at your fingertips.
            </p>
            <DownloadButtons />
          </motion.div>
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-6"></div>
              <Image
                src="/images/app-mockup.jpeg"
                alt="Chauffeur App Mockup"
                width={400}
                height={600}
                className="relative z-10 rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
