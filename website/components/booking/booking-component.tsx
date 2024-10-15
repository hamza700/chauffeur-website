'use client';

import React, { useState } from 'react';
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

const BookingComponent: React.FC = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState('oneWay');
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    duration: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert the form data to query parameters
    const queryParams = new URLSearchParams({
      ...formData,
      type: activeTab,
      date: date ? date.toISOString() : '',
    }).toString();

    // Redirect to the booking page with query parameters
    router.push(`/booking?${queryParams}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
    >
      <Tabs
        defaultValue="oneWay"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="oneWay"
            className={cn(
              'rounded-md transition-all duration-300',
              activeTab === 'oneWay'
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
                <Input
                  type="text"
                  placeholder="Pickup Location"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  className="pl-10 py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
              {activeTab === 'oneWay' && (
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                  <Input
                    type="text"
                    placeholder="Dropoff Location"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleInputChange}
                    className="pl-10 py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                  />
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
                  <SelectTrigger className="w-full sm:w-[150px] py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
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
                      'w-full sm:w-[180px] justify-start text-left font-normal py-6 rounded-lg border-gray-300',
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
                <SelectTrigger className="w-full sm:w-[140px] py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
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
                className="w-full sm:w-auto py-6 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors duration-300"
              >
                Search
              </Button>
            </form>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default BookingComponent;
