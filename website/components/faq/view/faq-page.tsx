'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const faqCategories = [
  {
    slug: 'booking-process',
    title: 'Booking Process',
    description: 'Learn about our booking system and how to make reservations.',
  },
  {
    slug: 'payment-pricing',
    title: 'Payment and Pricing',
    description: 'Information about our pricing structure and payment methods.',
  },
  {
    slug: 'services-offered',
    title: 'Services Offered',
    description: 'Explore the range of chauffeur services we provide.',
  },
  {
    slug: 'account-management',
    title: 'Account Management',
    description: 'Manage your account, bookings, and personal information.',
  },
  {
    slug: 'other-topics',
    title: 'Other Topics',
    description: 'Additional information and frequently asked questions.',
  },
];

export function FAQView() {
  return (
    <div className="bg-gradient-to-b from-primary/5 to-primary/10 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Find answers to common questions about our chauffeur services, booking
          process, and more.
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqCategories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/faq/${category.slug}`} className="block h-full">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card">
                  <CardHeader className="border-b border-border/20 pb-4">
                    <CardTitle className="text-2xl font-semibold text-primary flex items-center justify-between">
                      {category.title}
                      <ChevronRight className="h-6 w-6 text-primary/60" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
