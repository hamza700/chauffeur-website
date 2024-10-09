import React from 'react';
import Image from 'next/image';
import DownloadButtons from './DownloadButtons';

const DownloadApp: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
            <p className="text-gray-600 mb-6">
              Get the best chauffeur experience with our mobile app. Book rides, manage your trips, and enjoy seamless travel at your fingertips.
            </p>
            <DownloadButtons />
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/app-mockup.jpeg"
              alt="Chauffeur App Mockup"
              width={400}
              height={600}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;