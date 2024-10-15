'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Car, Smile, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: 'Create Route',
    description: 'Select pickup and dropoff locations or duration.',
    image: '/images/create-route.jpeg',
  },
  {
    icon: <Car className="w-8 h-8 text-primary" />,
    title: 'Choose Vehicle',
    description: 'Select from available vehicle types.',
    image: '/images/choose-vehicle.jpeg',
  },
  {
    icon: <Smile className="w-8 h-8 text-primary" />,
    title: 'Enjoy Journey',
    description: 'Confirmation and ride experience.',
    image: '/images/enjoy-journey.jpeg',
  },
];

function HowItWorks() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setActiveStep(api.selectedScrollSnap());
    });
  }, [api]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    api?.scrollTo(index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <button
                    className={cn(
                      'flex items-center w-full p-6 rounded-xl transition-all duration-300 shadow-sm',
                      activeStep === index
                        ? 'bg-primary text-white'
                        : 'bg-white hover:bg-gray-100'
                    )}
                    onClick={() => handleStepClick(index)}
                  >
                    <div className="mr-6">
                      {React.cloneElement(step.icon as React.ReactElement, {
                        className: cn(
                          'w-10 h-10',
                          activeStep === index ? 'text-white' : 'text-primary'
                        ),
                      })}
                    </div>
                    <div className="text-left">
                      <h3
                        className={cn(
                          'text-xl font-semibold mb-2',
                          activeStep === index ? 'text-white' : 'text-gray-800'
                        )}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          'text-sm',
                          activeStep === index
                            ? 'text-white/90'
                            : 'text-gray-600'
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </button>
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-4">
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-2/3 flex justify-center items-start">
            <motion.div
              className="w-full max-w-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {steps.map((step, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video relative rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={step.image}
                          alt={step.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
              </Carousel>
              <div className="flex justify-center mt-6">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      'w-3 h-3 rounded-full mx-1 transition-all duration-300',
                      activeStep === index
                        ? 'bg-primary scale-125'
                        : 'bg-gray-300'
                    )}
                    onClick={() => handleStepClick(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
