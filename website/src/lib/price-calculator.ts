interface PriceCalculatorParams {
  distance: number; // in kilometers
  vehicleClass: 'Business' | 'First' | 'Van';
  isAirportTransfer: boolean;
  pickupTime: string; // 24-hour format "HH:mm"
}

interface HourlyPriceParams {
  vehicleClass: 'Business' | 'First' | 'Van';
  hours: number;
  isAirportTransfer: boolean;
}

interface DistanceBand {
  rate: number;
  distance: number;
}

// Constants as per booking-function.md
const BASE_FARE = 30.0;
const AIRPORT_FEE = 10.0;
const PEAK_SURCHARGE = 0.1; // 10%

const DISTANCE_BANDS: DistanceBand[] = [
  { rate: 3.0, distance: 10 }, // Band 1: 0-10 KM
  { rate: 2.0, distance: 30 }, // Band 2: 10-40 KM
  { rate: 1.5, distance: Infinity }, // Band 3: 40+ KM
];

const CLASS_MULTIPLIERS = {
  business: 1.0,
  first: {
    base: 1.5,
    after20km: 1.3,
  },
  van: {
    base: 1.4,
    ratePerKm: 0.002,
    maxMultiplier: 1.9,
  },
};

const HOURLY_RATES = {
  business: 55,
  first: 65,
  van: 70,
};

function isPeakHour(time: string): boolean {
  const hour = parseInt(time.split(':')[0], 10);
  return hour >= 6 && hour < 13;
}

function calculateVanMultiplier(distance: number): number {
  const multiplier =
    CLASS_MULTIPLIERS.van.base + CLASS_MULTIPLIERS.van.ratePerKm * distance;
  return Math.min(multiplier, CLASS_MULTIPLIERS.van.maxMultiplier);
}

function calculatePerKilometerCharges(distance: number): number {
  let remainingDistance = distance;
  let totalCharge = 0;
  let processedDistance = 0;

  for (const band of DISTANCE_BANDS) {
    const distanceInBand = Math.min(
      remainingDistance,
      band.distance - processedDistance
    );

    if (distanceInBand > 0) {
      totalCharge += distanceInBand * band.rate;
      remainingDistance -= distanceInBand;
      processedDistance += distanceInBand;
    }

    if (remainingDistance <= 0) break;
  }

  return totalCharge;
}

export function calculatePrice({
  distance,
  vehicleClass,
  isAirportTransfer,
  pickupTime,
}: PriceCalculatorParams): number {
  // 1. Calculate base components
  const baseFare = BASE_FARE;
  const airportFee = isAirportTransfer ? AIRPORT_FEE : 0;
  const distanceCharge = calculatePerKilometerCharges(distance);

  // 2. Calculate class multiplier
  let classMultiplier = 1.0;
  switch (vehicleClass) {
    case 'Business':
      classMultiplier = CLASS_MULTIPLIERS.business;
      break;
    case 'First':
      classMultiplier =
        distance <= 20
          ? CLASS_MULTIPLIERS.first.base
          : CLASS_MULTIPLIERS.first.after20km;
      break;
    case 'Van':
      classMultiplier = calculateVanMultiplier(distance);
      break;
  }

  // 3. Calculate peak surcharge
  const peakSurcharge = isPeakHour(pickupTime) ? PEAK_SURCHARGE : 0;

  // 4. Calculate subtotal before peak surcharge
  const subtotal = (baseFare + airportFee + distanceCharge) * classMultiplier;

  // 5. Calculate final price
  const finalPrice = subtotal * (1 + peakSurcharge);

  return Number(finalPrice.toFixed(2));
}

export function calculateHourlyPrice({
  vehicleClass,
  hours,
  isAirportTransfer,
}: HourlyPriceParams): number {
  if (!hours) throw new Error('Hours must be provided for hourly bookings');

  const hourlyRate =
    vehicleClass === 'Business'
      ? HOURLY_RATES.business
      : vehicleClass === 'First'
      ? HOURLY_RATES.first
      : HOURLY_RATES.van;

  const airportFee = isAirportTransfer ? AIRPORT_FEE : 0;
  const basePrice = hourlyRate * hours;

  return Number((basePrice + airportFee).toFixed(2));
}

// Helper function to format price in GBP
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(price);
}
