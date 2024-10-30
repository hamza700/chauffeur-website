import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface BookingState {
  vehicle: string | null;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    passengers: number;
    luggage: number;
    flightNumber: string;
    specialRequests: string | null;
  } | null;
  initialBookingDetails: {
    type: string | null;
    pickupLocation: string | null;
    dropoffLocation: string | null;
    date: string | null;
    time: string | null;
    duration: string | null;
  } | null;
  distanceData: {
    distance: string | null;
    estimatedDuration: string | null;
  } | null;
  bookingReference: string | null;
  paymentStatus: {
    status: 'pending' | 'processing' | 'completed' | 'failed' | null;
    sessionId?: string; // Stripe session ID
  };
}

type BookingAction =
  | { type: 'SET_VEHICLE'; payload: string }
  | { type: 'SET_CUSTOMER_DETAILS'; payload: BookingState['customerDetails'] }
  | {
      type: 'SET_INITIAL_DETAILS';
      payload: BookingState['initialBookingDetails'];
    }
  | { type: 'SET_DISTANCE_DATA'; payload: BookingState['distanceData'] }
  | { type: 'SET_BOOKING_REFERENCE'; payload: string }
  | { type: 'SET_PAYMENT_STATUS'; payload: BookingState['paymentStatus'] }
  | { type: 'RESET_BOOKING' };

const initialState: BookingState = {
  vehicle: null,
  customerDetails: null,
  initialBookingDetails: null,
  distanceData: null,
  bookingReference: null,
  paymentStatus: {
    status: null,
  },
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
  switch (action.type) {
    case 'SET_VEHICLE':
      return { ...state, vehicle: action.payload };
    case 'SET_CUSTOMER_DETAILS':
      return { ...state, customerDetails: action.payload };
    case 'SET_INITIAL_DETAILS':
      return { ...state, initialBookingDetails: action.payload };
    case 'SET_DISTANCE_DATA':
      return { ...state, distanceData: action.payload };
    case 'SET_BOOKING_REFERENCE':
      return { ...state, bookingReference: action.payload };
    case 'SET_PAYMENT_STATUS':
      return { ...state, paymentStatus: action.payload };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

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
