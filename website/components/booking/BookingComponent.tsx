'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

const BookingComponent: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("oneWay");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
    >
      <Tabs defaultValue="oneWay" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="oneWay"
            className={cn(
              "rounded-md transition-all duration-300",
              activeTab === "oneWay" ? "bg-primary text-white shadow-lg" : "text-gray-600 hover:bg-gray-200"
            )}
          >
            One Way
          </TabsTrigger>
          <TabsTrigger 
            value="hourly"
            className={cn(
              "rounded-md transition-all duration-300",
              activeTab === "hourly" ? "bg-primary text-white shadow-lg" : "text-gray-600 hover:bg-gray-200"
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
            <TabsContent value="oneWay">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                  <Input type="text" placeholder="Pickup Location" className="pl-10 py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary" />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                  <Input type="text" placeholder="Dropoff Location" className="pl-10 py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full sm:w-[180px] justify-start text-left font-normal py-6 rounded-lg border-gray-300",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {date ? date.toLocaleDateString() : <span>Pick a date</span>}
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
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                  <Input type="time" className="pl-10 w-full sm:w-[140px] py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary" />
                </div>
                <Button type="submit" className="w-full sm:w-auto py-6 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors duration-300">Search</Button>
              </form>
            </TabsContent>
            <TabsContent value="hourly">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                  <Input type="text" placeholder="Pickup Location" className="pl-10 py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary" />
                </div>
                <Input type="number" placeholder="Duration (hours)" min="1" max="24" className="w-full sm:w-[150px] py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full sm:w-[180px] justify-start text-left font-normal py-6 rounded-lg border-gray-300",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {date ? date.toLocaleDateString() : <span>Pick a date</span>}
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
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                  <Input type="time" className="pl-10 w-full sm:w-[140px] py-6 rounded-lg border-gray-300 focus:border-primary focus:ring-primary" />
                </div>
                <Button type="submit" className="w-full sm:w-auto py-6 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors duration-300">Search</Button>
              </form>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default BookingComponent;