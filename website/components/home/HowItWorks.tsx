'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Car, Smile, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    icon: <MapPin className="w-8 h-8 text-blue-500" />,
    title: 'Create Route',
    description: 'Select pickup and dropoff locations or duration.',
    image: '/images/create-route.jpeg',
  },
  {
    icon: <Car className="w-8 h-8 text-blue-500" />,
    title: 'Choose Vehicle',
    description: 'Select from available vehicle types.',
    image: '/images/choose-vehicle.jpeg',
  },
  {
    icon: <Smile className="w-8 h-8 text-blue-500" />,
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

    api.on("select", () => {
      setActiveStep(api.selectedScrollSnap());
    });
  }, [api]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    api?.scrollTo(index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-4">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <button
                    className={cn(
                      "flex items-center w-full p-4 rounded-lg transition-colors",
                      activeStep === index ? "bg-blue-100" : "hover:bg-gray-100"
                    )}
                    onClick={() => handleStepClick(index)}
                  >
                    <div className="mr-4">{step.icon}</div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </button>
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="lg:w-2/3 flex justify-center items-start">
            <div className="w-full max-w-2xl">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {steps.map((step, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video relative rounded-lg overflow-hidden">
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
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
