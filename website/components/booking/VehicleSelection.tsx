import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Select Your Vehicle</h2>
      {vehicles.map((vehicle) => (
        <Card 
          key={vehicle.id} 
          className="overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                width={600}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
            <CardContent className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">{vehicle.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{vehicle.description}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <span>👤 Passengers {vehicle.capacity}</span>
                  <span>🧳 Luggage {vehicle.luggage}</span>
                </div>
                <p className="text-3xl font-bold mb-2">${vehicle.price}</p>
                <p className="text-sm text-gray-600">All prices include VAT, fees & tip.</p>
              </div>
              <Button className="w-full mt-4" onClick={() => onNext({ vehicle: vehicle.id })}>
                Select <span className="ml-2">→</span>
              </Button>
            </CardContent>
          </div>
          <Separator className="my-4" />
          <CardFooter className="px-6 py-4 flex flex-wrap gap-4 text-sm">
            <span>🏅 Meet & Greet included</span>
            <span>❌ Free cancellation</span>
            <span>🕒 Free Waiting time</span>
            <span>🛡️ Safe and secure travel</span>
            <Button variant="link" className="p-0">Show more information</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default VehicleSelection;