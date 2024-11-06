'use client';

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useBooking } from '@/context/booking/booking-context';

interface Location {
  address: string;
  displayName?: string;
  placeId: string;
  lat: number;
  lng: number;
  isAirport?: boolean;
}

interface DistanceData {
  distance: string;
  estimatedDuration: string;
}

// Define libraries outside the component to prevent recreating the array on each render
const libraries = ['places'];

// Add this helper function at the top of the file
function isAirportPlace(place: google.maps.places.PlaceResult): boolean {
  return place?.types?.includes('airport') || false;
}

export function BookingComponent() {
  const router = useRouter();
  const [loadError, setLoadError] = useState<Error | null>(null);

  // Use useMemo to memoize the options object
  const mapOptions = useMemo(
    () => ({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      libraries,
    }),
    []
  );

  const { isLoaded, loadError: scriptLoadError } = useLoadScript(mapOptions);

  useEffect(() => {
    if (scriptLoadError) {
      console.error('Error loading Google Maps script:', scriptLoadError);
      setLoadError(scriptLoadError);
    }
  }, [scriptLoadError]);

  const [date, setDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState('chauffeur');
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    duration: '',
  });
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [distanceData, setDistanceData] = useState<DistanceData | null>(null);

  const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const dropoffAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const [isSearching, setIsSearching] = useState(false);

  const { dispatch } = useBooking();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    try {
      dispatch({ type: 'RESET_BOOKING' });

      // Extract distance value from distanceData
      const distanceInKm = distanceData
        ? parseFloat(distanceData.distance.replace('km', '').trim())
        : 0;

      // Check if either pickup or dropoff is an airport using the place types
      const pickupPlace = pickupAutocompleteRef.current?.getPlace();
      const dropoffPlace = dropoffAutocompleteRef.current?.getPlace();

      const isAirport =
        (pickupPlace || dropoffPlace) &&
        (isAirportPlace(pickupPlace!) || isAirportPlace(dropoffPlace!));

      const queryParams = new URLSearchParams({
        ...formData,
        type: activeTab,
        date: date ? date.toISOString() : '',
        distance: distanceInKm.toString(),
        isAirportTransfer: isAirport?.toString() || 'false',
        pickupTime: formData.time,
        ...(distanceData && {
          distance: distanceData.distance,
          estimatedDuration: distanceData.estimatedDuration,
        }),
      }).toString();

      // Calculate prices for each vehicle class
      const priceDetails = {
        distance: distanceInKm,
        isAirportTransfer: isAirport,
        pickupTime: formData.time,
      };

      console.log('Setting price details:', priceDetails);

      dispatch({
        type: 'SET_PRICE_DETAILS',
        payload: priceDetails,
      });

      await router.push(`/booking?${queryParams}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setIsSearching(false);
    }
  };

  const handlePlaceSelect = useCallback(
    (
      autocomplete: google.maps.places.Autocomplete,
      locationType: 'pickup' | 'dropoff'
    ) => {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const displayName = place.name || '';
        const formattedAddress = place.formatted_address || '';

        const newLocation: Location = {
          address: formattedAddress,
          displayName: displayName,
          placeId: place.place_id || '',
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        if (locationType === 'pickup') {
          setPickupLocation(newLocation);
          setFormData((prev) => ({
            ...prev,
            pickupLocation: `${displayName} - ${formattedAddress}`,
          }));
        } else {
          setDropoffLocation(newLocation);
          setFormData((prev) => ({
            ...prev,
            dropoffLocation: `${displayName} - ${formattedAddress}`,
          }));
        }
      } else {
        console.error(
          `${locationType} place geometry or location not available`
        );
      }
    },
    []
  );

  const calculateDistance = useCallback(async () => {
    if (pickupLocation && dropoffLocation) {
      const service = new google.maps.DistanceMatrixService();
      try {
        const response = await service.getDistanceMatrix({
          origins: [{ lat: pickupLocation.lat, lng: pickupLocation.lng }],
          destinations: [
            { lat: dropoffLocation.lat, lng: dropoffLocation.lng },
          ],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        });

        if (response.rows[0].elements[0].status === 'OK') {
          const newDistanceData = {
            distance: response.rows[0].elements[0].distance.text,
            estimatedDuration: response.rows[0].elements[0].duration.text,
          };
          setDistanceData(newDistanceData);
        } else {
          console.error(
            'DistanceMatrix status not OK:',
            response.rows[0].elements[0].status
          );
        }
      } catch (error) {
        console.error('Error calculating distance:', error);
      }
    }
  }, [pickupLocation, dropoffLocation]);

  useEffect(() => {
    if (activeTab === 'chauffeur') {
      calculateDistance();
    }
  }, [pickupLocation, dropoffLocation, activeTab, calculateDistance]);

  // Optimize Autocomplete components
  const renderAutocomplete = useCallback(
    (locationType: 'pickup' | 'dropoff') => (
      <Autocomplete
        onLoad={(autocomplete) => {
          if (locationType === 'pickup') {
            pickupAutocompleteRef.current = autocomplete;
          } else {
            dropoffAutocompleteRef.current = autocomplete;
          }
          autocomplete.setComponentRestrictions({ country: 'gb' });
          autocomplete.setFields([
            'name',
            'address_components',
            'geometry',
            'place_id',
            'formatted_address',
            'types',
          ]);
        }}
        onPlaceChanged={() => {
          const autocomplete =
            locationType === 'pickup'
              ? pickupAutocompleteRef.current
              : dropoffAutocompleteRef.current;
          if (autocomplete) {
            handlePlaceSelect(autocomplete, locationType);
          }
        }}
      >
        <Input
          type="text"
          placeholder={`${
            locationType === 'pickup' ? 'Pickup' : 'Dropoff'
          } Location`}
          name={`${locationType}Location`}
          value={formData[`${locationType}Location`]}
          onChange={handleInputChange}
          className="pl-10 py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
        />
      </Autocomplete>
    ),
    [formData, handleInputChange, handlePlaceSelect]
  );

  useEffect(() => {
    return () => {
      setIsSearching(false);
    };
  }, []);

  if (loadError) {
    return (
      <div className="text-red-500 p-4">
        Error loading Google Maps: {loadError.message}. Please check your API
        key and console for more details.
      </div>
    );
  }

  if (!isLoaded) return <div className="p-4">Loading maps...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
    >
      <Tabs
        defaultValue="chauffeur"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="chauffeur"
            className={cn(
              'rounded-md transition-all duration-300',
              activeTab === 'chauffeur'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-200'
            )}
          >
            One Way
          </TabsTrigger>
          <TabsTrigger
            value="hourly"
            className={cn(
              'rounded-md transition-all duration-300',
              activeTab === 'hourly'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-200'
            )}
          >
            Hourly
          </TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <form
              onSubmit={handleSearch}
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                {renderAutocomplete('pickup')}
              </div>
              {activeTab === 'chauffeur' && (
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                  {renderAutocomplete('dropoff')}
                </div>
              )}
              {activeTab === 'hourly' && (
                <Select
                  name="duration"
                  value={formData.duration}
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: 'duration', value } })
                  }
                >
                  <SelectTrigger className="w-full sm:w-[180px] py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Duration (hours)" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    sideOffset={5}
                    align="start"
                    side="bottom"
                    className="max-h-[200px] overflow-y-auto"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 1).map(
                      (hours) => (
                        <SelectItem key={hours} value={hours.toString()}>
                          {hours} {hours === 1 ? 'hour' : 'hours'}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full sm:w-[200px] justify-start text-left font-normal py-6 rounded-lg border-gray-300',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {date ? (
                      date.toLocaleDateString()
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="rounded-lg border border-gray-200"
                    disabled={(date) => date < new Date()} // Disable past dates
                  />
                </PopoverContent>
              </Popover>
              <Select
                name="time"
                value={formData.time}
                onValueChange={(value) =>
                  handleInputChange({ target: { name: 'time', value } })
                }
              >
                <SelectTrigger className="w-full sm:w-[160px] py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
                  <SelectValue placeholder="Select time">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-primary" />
                      {formData.time || (
                        <>
                          <Clock className="mr-2 h-4 w-4 text-primary" />
                          Select time
                        </>
                      )}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={5}
                  align="start"
                  side="bottom"
                  className="max-h-[200px] overflow-y-auto"
                >
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, '0');
                    return (
                      <SelectItem key={hour} value={`${hour}:00`}>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-primary" />
                          {`${hour}:00`}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto py-6 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors duration-300"
              >
                {isSearching ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Searching
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </form>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}
export default BookingComponent;
