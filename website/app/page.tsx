import HeroSection from '@/components/hero/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import OurServices from '@/components/home/OurServices';
import CompanyFacts from '@/components/home/CompanyFacts';
import DownloadApp from '@/components/home/DownloadApp';

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
