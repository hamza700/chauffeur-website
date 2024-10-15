'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ChauffeurService from '@/components/services/chauffeur-service';
import HourlyRates from '@/components/services/hourly-rates';

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get('type');

  return (
    <main>
      {serviceType === 'chauffeur' && <ChauffeurService />}
      {serviceType === 'hourly' && <HourlyRates />}
    </main>
  );
}
