import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, Briefcase, Award, Ban, Clock, Shield } from 'lucide-react';

interface VehicleSelectionProps {
  onNext: (data: { vehicle: string }) => void;
}

const vehicles = [
  {
    id: 'business',
    name: 'Business Class',
    description: 'Mercedes-Benz E-Class, BMW 5 Series, Cadillac XTS or similar',
    capacity: 3,
    luggage: 2,
    price: 1150,
    image: '/images/business-class.webp',
  },
  {
    id: 'first',
    name: 'First Class',
    description: 'Mercedes-Benz S-Class, BMW 7 Series, Cadillac XTS or similar',
    capacity: 4,
    luggage: 3,
    price: 1500,
    image: '/images/first-class.webp',
  },
  {
    id: 'van',
    name: 'Van/SUV',
    description: 'Mercedes-Benz V-Class, Ford Transit or similar',
    capacity: 6,
    luggage: 4,
    price: 2000,
    image: '/images/van-suv.webp',
  },
];

function VehicleSelection({ onNext }: VehicleSelectionProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Select Your Vehicle</h2>
      {vehicles.map((vehicle, index) => (
        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card  className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="col-span-1 md:col-span-2 relative">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {vehicle.name}
                </div>
              </div>
              <CardContent className="p-6 flex flex-col justify-between bg-gray-50">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{vehicle.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{vehicle.description}</p>
                  <div className="flex items-center space-x-4 mb-4 text-gray-700">
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {vehicle.capacity}</span>
                    <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {vehicle.luggage}</span>
                  </div>
                  <p className="text-3xl font-bold mb-2 text-primary">${vehicle.price}</p>
                  <p className="text-sm text-gray-600">All prices include VAT, fees & tip.</p>
                </div>
                <Button 
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-white" 
                  onClick={() => onNext({ vehicle: vehicle.id })}
                >
                  Select <span className="ml-2">→</span>
                </Button>
              </CardContent>
            </div>
            <Separator className="my-4" />
            <CardFooter className="px-6 py-4 flex flex-wrap gap-4 text-sm bg-gray-50">
              <span className="flex items-center text-gray-700"><Award className="w-4 h-4 mr-2" /> Meet & Greet included</span>
              <span className="flex items-center text-gray-700"><Ban className="w-4 h-4 mr-2" /> Free cancellation</span>
              <span className="flex items-center text-gray-700"><Clock className="w-4 h-4 mr-2" /> Free Waiting time</span>
              <span className="flex items-center text-gray-700"><Shield className="w-4 h-4 mr-2" /> Safe and secure travel</span>
              <Button variant="link" className="p-0 text-primary hover:underline">Show more information</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default VehicleSelection;