import HeroSection from '@/sections/home/hero-section';
import HowItWorks from '@/sections/home/how-it-works';
import OurServices from '@/sections/home/our-services';
import CompanyFacts from '@/sections/home/company-facts';
import DownloadApp from '@/sections/home/download-app';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <OurServices />
      <CompanyFacts />
      <DownloadApp />
    </main>
  );
}
