'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ChauffeurService from '@/components/services/ChauffeurService';
import HourlyRates from '@/components/services/HourlyRates';

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
