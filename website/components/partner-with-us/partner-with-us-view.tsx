'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronRight,
  CheckCircle,
  Users,
  TrendingUp,
  Headphones,
} from 'lucide-react';
import FAQAccordion from '@/components/faq/faq-accordion';

const benefits = [
  {
    title: 'Increased Revenue',
    description: 'Tap into our extensive client base and boost your earnings.',
    icon: TrendingUp,
  },
  {
    title: 'Brand Exposure',
    description:
      'Gain visibility through our marketing channels and partnerships.',
    icon: Users,
  },
  {
    title: 'Operational Support',
    description:
      'Benefit from our streamlined processes and dedicated support team.',
    icon: Headphones,
  },
  {
    title: 'Technology Integration',
    description: 'Access our cutting-edge booking and management systems.',
    icon: CheckCircle,
  },
];

const testimonials = [
  {
    name: 'John Doe',
    company: 'Luxury Hotels Inc.',
    quote:
      'Partnering with this chauffeur service has significantly enhanced our guest experience.',
  },
  {
    name: 'Jane Smith',
    company: 'Corporate Travel Ltd.',
    quote:
      'The reliability and professionalism of their service have made them our go-to transportation partner.',
  },
];

const faqs = [
  {
    question: 'How do I become a partner?',
    answer:
      'To become a partner, simply fill out our application form. Our team will review your submission and contact you to discuss the next steps.',
  },
  {
    question: 'What are the requirements for partnership?',
    answer:
      'Requirements vary depending on the type of partnership. Generally, we look for businesses with a strong reputation, aligned values, and a commitment to excellent service.',
  },
  {
    question: 'How long does the partnership process take?',
    answer:
      'The partnership process typically takes 2-4 weeks, depending on the complexity of the arrangement and the readiness of both parties.',
  },
];

export default function PartnerWithUsView() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="/images/partner-hero.jpg"
          alt="Partnership"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 text-center text-white max-w-4xl px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Partner With Us
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join forces with the leading chauffeur service and elevate your
            business to new heights
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="#apply-now">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-lg px-8 py-6"
              >
                Apply Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">
            Why Partner With Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <benefit.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Information with Images */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-24">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Expand Your Reach
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Partner with us to access a wider customer base and increase
                your business opportunities. Our established network and
                marketing efforts will help you grow your presence in the luxury
                transportation market.
              </p>
              <Button variant="outline" size="lg">
                Learn More <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/expand-reach.jpg"
                alt="Expand Your Reach"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pl-12">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Elevate Your Service
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                By partnering with our premium chauffeur service, you&apos;ll be
                able to offer your clients an unparalleled level of luxury and
                convenience. Our commitment to excellence will complement and
                enhance your existing services.
              </p>
              <Button variant="outline" size="lg">
                Discover More <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/elevate-service.jpg"
                alt="Elevate Your Service"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">
            What Our Partners Say
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <p className="text-xl italic mb-6 text-muted-foreground">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <p className="font-semibold text-lg text-primary">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="apply-now"
        className="py-24 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Partner With Us?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Take the first step towards a mutually beneficial partnership that
            will transform your business and elevate your service offerings.
          </p>
          <Button
            size="lg"
            className="bg-background text-primary hover:bg-background/90 transition-colors text-lg px-8 py-6"
          >
            Apply Now <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-8 text-lg">
            For inquiries, contact us at{' '}
            <a
              href="mailto:partnerships@chauffeurservice.com"
              className="underline hover:text-primary-foreground/80"
            >
              partnerships@chauffeurservice.com
            </a>
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
