import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookingComponent from '@/components/booking/booking-component';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Star, Clock, Shield, Award, ChevronRight } from 'lucide-react';

const HourlyRates: React.FC = () => {
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const hourlyPackages = [
    {
      name: 'Standard Package',
      duration: '4 hours',
      price: 300,
      features: ['City tours', 'Airport transfers', 'Business meetings'],
    },
    {
      name: 'Half-Day Package',
      duration: '6 hours',
      price: 450,
      features: ['Shopping trips', 'Sightseeing tours', 'Corporate events'],
    },
    {
      name: 'Full-Day Package',
      duration: '10 hours',
      price: 700,
      features: [
        'Wedding transportation',
        'Full-day excursions',
        'VIP services',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Emily R.',
      role: 'Event Planner',
      content:
        'The hourly service was perfect for our corporate event. The flexibility to extend our booking was a lifesaver!',
    },
    {
      name: 'Michael S.',
      role: 'Business Executive',
      content:
        "I use the hourly service for my business meetings. It's reliable, professional, and always impresses my clients.",
    },
    {
      name: 'Sophie L.',
      role: 'Tourist',
      content:
        'We booked the hourly service for a day tour of the city. Our chauffeur was knowledgeable and made the experience unforgettable.',
    },
  ];

  return (
    <div className="bg-white" ref={topRef}>
      {/* Hero Section with Booking Component */}
      <section className="relative h-screen min-h-[600px]">
        <Image
          src="/images/hourly-rates-hero.jpeg"
          alt="Luxury Hourly Chauffeur Service"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hourly Chauffeur Service
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-white text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Flexible luxury transportation tailored to your schedule
          </motion.p>
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BookingComponent />
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hourly Rates for Every Occasion
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our hourly chauffeur service offers unparalleled flexibility and
            luxury. Whether you need transportation for a few hours or a full
            day, our professional drivers and premium vehicles are at your
            disposal.
          </motion.p>
        </div>
      </section>

      {/* Hourly Packages */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Hourly Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hourlyPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      {pkg.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-primary mb-4">
                      ${pkg.price}
                    </p>
                    <p className="text-gray-600 mb-6">for {pkg.duration}</p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <ChevronRight className="w-5 h-5 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" onClick={scrollToTop}>
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Our Hourly Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <Clock className="w-16 h-16 text-primary" />,
                title: 'Flexibility',
                description:
                  'Book for as long as you need, with the option to extend your service on-the-go.',
              },
              {
                icon: <Shield className="w-16 h-16 text-primary" />,
                title: 'Reliability',
                description:
                  'Our punctual and professional chauffeurs ensure you&apos;re always on schedule.',
              },
              {
                icon: <Star className="w-16 h-16 text-primary" />,
                title: 'Luxury',
                description:
                  'Travel in style with our fleet of high-end vehicles, perfect for any occasion.',
              },
              {
                icon: <Award className="w-16 h-16 text-primary" />,
                title: 'Customization',
                description:
                  'Tailor your journey with personalized routes and stops to suit your needs.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Perfect for Any Occasion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-64 relative mb-6">
                <Image
                  src="/images/business-meetings.jpeg"
                  alt="Business Meetings"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Business Meetings</h3>
              <p className="text-gray-600">
                Impress clients and partners with punctual and professional
                transportation. Our hourly service ensures you arrive at
                multiple locations stress-free.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-full h-64 relative mb-6">
                <Image
                  src="/images/city-tours.jpeg"
                  alt="City Tours"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">City Tours</h3>
              <p className="text-gray-600">
                Explore the city in comfort and style. Our knowledgeable
                chauffeurs can guide you through local attractions and hidden
                gems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <p className="text-xl text-gray-600 mb-6 italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Book Your Hourly Service?
          </h2>
          <p className="text-2xl mb-12">
            Experience the flexibility and luxury of our hourly chauffeur
            service.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100 text-xl px-8 py-6"
            onClick={scrollToTop}
          >
            Book Now
            <ChevronRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="item-1" className="border rounded-lg p-2">
                <AccordionTrigger className="text-xl font-semibold">
                  How does the hourly service work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Our hourly service allows you to book a chauffeur and vehicle
                  for a minimum of 2 hours. You can extend your booking as
                  needed, and you&apos;ll only be charged for the time you use.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg p-2">
                <AccordionTrigger className="text-xl font-semibold">
                  Can I make multiple stops during my hourly booking?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Yes, you can make as many stops as you like within your booked
                  time. Just inform your chauffeur of your desired itinerary.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg p-2">
                <AccordionTrigger className="text-xl font-semibold">
                  What if I need to extend my booking?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  You can extend your booking on-the-go, subject to
                  availability. Simply inform your chauffeur or contact our
                  customer service.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg p-2">
                <AccordionTrigger className="text-xl font-semibold">
                  Is there a cancellation fee for hourly bookings?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Cancellations made more than 24 hours before the scheduled
                  pickup time are free of charge. For cancellations within 24
                  hours, a fee may apply. Please refer to our terms and
                  conditions for details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HourlyRates;
