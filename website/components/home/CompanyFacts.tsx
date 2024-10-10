'use client';

import React from 'react';
import { Calendar, ThumbsUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface FactProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Fact: React.FC<FactProps> = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-primary mb-6 bg-primary/10 p-4 rounded-full">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-lg">{description}</p>
  </motion.div>
);

const CompanyFacts: React.FC = () => {
  const facts = [
    {
      icon: <Calendar className="w-12 h-12" />,
      title: '10+ Years in Business',
      description: 'A decade of excellence in luxury transportation.',
    },
    {
      icon: <ThumbsUp className="w-12 h-12" />,
      title: '5,000+ Happy Clients',
      description: 'Consistently exceeding customer expectations.',
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: '1 Million Miles',
      description: 'Safely driven across cities and countries.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Achievements
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {facts.map((fact, index) => (
            <Fact key={index} {...fact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyFacts;
