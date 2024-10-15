import HeroSection from '@/components/hero/hero-section';
import HowItWorks from '@/components/home/how-it-works';
import OurServices from '@/components/home/our-services';
import CompanyFacts from '@/components/home/company-facts';
import DownloadApp from '@/components/home/download-app';

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
