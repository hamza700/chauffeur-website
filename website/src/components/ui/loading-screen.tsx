'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000); // Hide after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div
              className="relative inline-flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Image
                src="/placeholder.svg"
                alt="Company Logo"
                width={150}
                height={150}
                className="z-10"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/30"
                animate={{
                  scale: [1, 1.2, 1.2, 1, 1],
                  rotate: [0, 270, 270, 0, 0],
                  opacity: [1, 0.25, 0.25, 0.25, 1],
                  borderRadius: ["25%", "25%", "50%", "50%", "25%"],
                }}
                transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/60"
                animate={{
                  scale: [1.6, 1, 1, 1.6, 1.6],
                  rotate: [270, 0, 0, 270, 270],
                  opacity: [0.25, 1, 1, 1, 0.25],
                  borderRadius: ["25%", "25%", "50%", "50%", "25%"],
                }}
                transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
              />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold text-primary mt-8 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Your Company Name
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Luxury Chauffeur Services
            </motion.p>
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Loading your luxury experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}