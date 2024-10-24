'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import FAQAccordion from '@/sections/faq/faq-accordion';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { paths } from '@/routes/paths';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  'booking-process': [
    {
      question: 'How do I make a booking?',
      answer:
        'You can make a booking through our website or mobile app. Simply enter your pickup and drop-off locations, select your preferred vehicle type, and choose your date and time.',
    },
    {
      question: 'Can I book a chauffeur for multiple stops?',
      answer:
        'Yes, you can book a chauffeur for multiple stops. During the booking process, you can add additional stops to your itinerary.',
    },
    // Add more questions and answers for this category
  ],
  'payment-pricing': [
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit cards, and digital wallets such as Apple Pay and Google Pay.',
    },
    {
      question: 'How is the fare calculated?',
      answer:
        "Our fares are calculated based on the distance, duration, and type of vehicle selected. You'll see a price estimate before confirming your booking.",
    },
    // Add more questions and answers for this category
  ],
  // Add more categories with their respective questions and answers
};

interface FAQCategoryPageProps {
  params: { category: string };
}

export function FAQCategoryView({ params }: FAQCategoryPageProps) {
  const { category } = params;
  const faqItems = faqData[category];

  if (!faqItems) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b from-primary/5 to-primary/10 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={paths.faq.root}
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to FAQ Categories
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary capitalize">
            {category.replace('-', ' ')} FAQs
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            Find answers to common questions about {category.replace('-', ' ')}{' '}
            in our chauffeur service.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FAQAccordion items={faqItems} />
        </motion.div>
      </div>
    </div>
  );
}
