import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookingComponent from '@/components/booking/BookingComponent';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Star,
  Clock,
  Shield,
  Award,
  Users,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChauffeurService: React.FC = () => {
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fleetData = [
    {
      className: 'Business Class',
      vehicles: ['Mercedes-Benz E-Class', 'BMW 5 Series', 'Cadillac XTS'],
      image: '/images/business-class.webp',
      passengers: 3,
      luggage: 2,
    },
    {
      className: 'First Class',
      vehicles: ['Mercedes-Benz S-Class', 'BMW 7 Series', 'Cadillac XTS'],
      image: '/images/first-class.webp',
      passengers: 4,
      luggage: 3,
    },
    {
      className: 'Van/SUV',
      vehicles: ['Mercedes-Benz V-Class', 'Ford Transit'],
      image: '/images/van-suv.webp',
      passengers: 6,
      luggage: 4,
    },
  ];

  const testimonials = [
    {
      name: 'John D.',
      role: 'Business Executive',
      content:
        'The chauffeur service exceeded my expectations. Punctual, professional, and the vehicle was immaculate.',
    },
    {
      name: 'Sarah M.',
      role: 'Event Planner',
      content:
        "I've used this service for multiple events, and they never disappoint. Reliable and luxurious!",
    },
    {
      name: 'Robert L.',
      role: 'Frequent Traveler',
      content:
        "The best chauffeur service I've experienced. Their attention to detail is unmatched.",
    },
  ];

  return (
    <div className="bg-white" ref={topRef}>
      {/* Hero Section with Booking Component */}
      <section className="relative h-screen min-h-[600px]">
        <Image
          src="/images/chauffeur-hero.jpeg"
          alt="Luxury Chauffeur Service"
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
            Chauffeur Service
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-white text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience luxury and comfort with our premium chauffeur service
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
            Welcome to Our Chauffeur Service
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our chauffeur service offers a luxurious and comfortable travel
            experience for discerning clients. Whether you&apos;re traveling for
            business or pleasure, our professional drivers and premium vehicles
            ensure a smooth and enjoyable journey.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Our Chauffeur Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <Clock className="w-16 h-16 text-primary" />,
                title: 'Punctuality',
                description:
                  'Our drivers are always on time, ensuring you never miss an important appointment.',
              },
              {
                icon: <Shield className="w-16 h-16 text-primary" />,
                title: 'Safety',
                description:
                  'Your safety is our top priority. All our vehicles are regularly maintained and equipped with the latest safety features.',
              },
              {
                icon: <Star className="w-16 h-16 text-primary" />,
                title: 'Comfort',
                description:
                  'Travel in style with our luxurious, well-appointed vehicles designed for your comfort.',
              },
              {
                icon: <Award className="w-16 h-16 text-primary" />,
                title: 'Professional Drivers',
                description:
                  'Our experienced and courteous drivers are committed to providing exceptional service.',
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

      {/* Luxury Experience */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-24">
            <motion.div
              className="md:w-1/2 mb-12 md:mb-0 md:pr-12"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-6">
                Unparalleled Comfort and Style
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Our chauffeur service goes beyond transportation. We offer an
                experience of luxury, comfort, and sophistication. From plush
                interiors to state-of-the-art amenities, every journey with us
                is designed to exceed your expectations and make your travel
                truly memorable.
              </p>
              <Button onClick={scrollToTop} size="lg" className="text-lg">
                Book Your Luxury Ride
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/images/luxury-interior.jpeg"
                alt="Luxury Vehicle Interior"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center">
            <motion.div
              className="md:w-1/2 mb-12 md:mb-0 md:pl-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-6">
                Tailored to Your Needs
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Whether it&apos;s airport transfers, corporate travel, or
                special events, our chauffeur service is customized to meet your
                specific requirements, ensuring a seamless and personalized
                experience.
              </p>
              <Button onClick={scrollToTop} size="lg" className="text-lg">
                Book Your Luxury Ride
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/images/tailored-service.jpeg"
                alt="Tailored Service"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Luxury Fleet Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Luxury Fleet at Your Service
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {fleetData.map((fleet, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 p-4"
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {fleet.className}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <Image
                        src={fleet.image}
                        alt={fleet.className}
                        width={300}
                        height={200}
                        className="rounded-lg mb-6"
                      />
                      <p className="text-lg text-gray-600 mb-4">
                        {fleet.vehicles.join(', ')}
                      </p>
                      <div className="flex justify-between w-full text-gray-700">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          <span>{fleet.passengers} passengers</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-5 h-5 mr-2" />
                          <span>{fleet.luggage} luggage</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
            Ready to Experience Luxury?
          </h2>
          <p className="text-2xl mb-12">
            Book your chauffeur service today and elevate your travel
            experience.
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
                  How do I book a chauffeur service?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  You can book our chauffeur service through our website, mobile
                  app, or by calling our customer service. Simply provide your
                  travel details, select your preferred vehicle, and confirm
                  your booking.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg p-2">
                <AccordionTrigger className="text-xl font-semibold">
                  What types of vehicles are available?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  We offer a range of luxury vehicles including sedans, SUVs,
                  and vans. Our fleet includes popular models from
                  Mercedes-Benz, BMW, and Audi, among others.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg p-2">
                <AccordionTrigger className="text-xl font-semibold">
                  Are your drivers professionally trained?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Yes, all our chauffeurs are professionally trained, licensed,
                  and experienced. They undergo rigorous background checks and
                  are trained in customer service to ensure your safety and
                  comfort.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg p-2">
                <AccordionTrigger className="text-xl font-semibold">
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Our cancellation policy allows free cancellation up to 24
                  hours before your scheduled pickup time. Cancellations made
                  within 24 hours may be subject to a fee. Please refer to our
                  terms and conditions for more details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChauffeurService;
