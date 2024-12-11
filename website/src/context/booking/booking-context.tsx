'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface BookingState {
  vehicle: string;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    passengers: number | null;
    luggage: number | null;
    flightNumber: string;
    specialRequests?: string;
  };
  initialBookingDetails: {
    type: string;
    pickupLocation: string;
    dropoffLocation?: string;
    date: string;
    time: string;
    duration: string;
  };
  distanceData: {
    distance?: string;
    estimatedDuration?: string;
  };
  priceDetails: {
    distance: number;
    isAirportTransfer?: boolean;
    pickupTime: string;
  };
  finalPrice: number;
  bookingReference: string;
}

type BookingAction =
  | { type: 'SET_VEHICLE'; payload: string }
  | { type: 'SET_CUSTOMER_DETAILS'; payload: BookingState['customerDetails'] }
  | {
      type: 'SET_INITIAL_DETAILS';
      payload: BookingState['initialBookingDetails'];
    }
  | { type: 'SET_DISTANCE_DATA'; payload: BookingState['distanceData'] }
  | { type: 'RESET_BOOKING' }
  | { type: 'SET_PRICE_DETAILS'; payload: BookingState['priceDetails'] }
  | { type: 'SET_FINAL_PRICE'; payload: number }
  | { type: 'SET_BOOKING_REFERENCE'; payload: string };

const initialState: BookingState = {
  vehicle: '',
  customerDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    passengers: null,
    luggage: null,
    flightNumber: '',
  },
  initialBookingDetails: {
    type: '',
    pickupLocation: '',
    date: '',
    time: '',
    duration: '',
  },
  distanceData: {
    distance: '',
    estimatedDuration: '',
  },
  priceDetails: {
    distance: 0,
    isAirportTransfer: false,
    pickupTime: '',
  },
  finalPrice: 0,
  bookingReference: '',
};

const BookingContext = createContext<
  | {
      state: BookingState;
      dispatch: React.Dispatch<BookingAction>;
    }
  | undefined
>(undefined);

function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  const newState = (() => {
    switch (action.type) {
      case 'SET_VEHICLE':
        return { ...state, vehicle: action.payload };
      case 'SET_CUSTOMER_DETAILS':
        return { ...state, customerDetails: action.payload };
      case 'SET_INITIAL_DETAILS':
        return { ...state, initialBookingDetails: action.payload };
      case 'SET_DISTANCE_DATA':
        return { ...state, distanceData: action.payload };
      case 'RESET_BOOKING':
        localStorage.removeItem('bookingState');
        return initialState;
      case 'SET_PRICE_DETAILS':
        return { ...state, priceDetails: action.payload };
      case 'SET_FINAL_PRICE':
        return { ...state, finalPrice: action.payload };
      case 'SET_BOOKING_REFERENCE':
        return { ...state, bookingReference: action.payload };
      default:
        return state;
    }
  })();

  localStorage.setItem('bookingState', JSON.stringify(newState));
  return newState;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, undefined, () => {
    if (typeof window === 'undefined') return initialState;

    const savedState = localStorage.getItem('bookingState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
