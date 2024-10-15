'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageSrc,
  href,
}) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative h-64 w-full">
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-6 text-lg">{description}</p>
      <Link href={href} passHref>
        <Button variant="default" className="group">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  </motion.div>
);

const services = [
  {
    title: 'Chauffeur Service',
    description: 'Experience luxury travel with our professional chauffeurs.',
    imageSrc: '/images/chauffeur-service.jpeg',
    href: '/services?type=chauffeur',
  },
  {
    title: 'Hourly Rates',
    description: 'Flexible hourly bookings for your convenience.',
    imageSrc: '/images/hourly-rates.jpeg',
    href: '/services?type=hourly',
  },
];

const OurServices: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Premium Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
