import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc, href }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-48 w-full">
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={href} passHref>
        <Button variant="outline">Learn More</Button>
      </Link>
    </div>
  </div>
);

const services = [
  {
    title: "Chauffeur Service",
    description: "Experience luxury travel with our professional chauffeurs.",
    imageSrc: "/images/chauffeur-service.jpeg",
    href: "/services?type=chauffeur"
  },
  {
    title: "Hourly Rates",
    description: "Flexible hourly bookings for your convenience.",
    imageSrc: "/images/hourly-rates.jpeg",
    href: "/services?type=hourly"
  }
];

const OurServices: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;