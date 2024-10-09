'use client';

import React from 'react';
import { Calendar, ThumbsUp, MapPin } from 'lucide-react';

interface FactProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Fact: React.FC<FactProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Company Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facts.map((fact, index) => (
            <Fact key={index} {...fact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyFacts;
