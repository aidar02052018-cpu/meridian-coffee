import { getAllBeans } from '@/lib/beans';
import { Hero } from '@/components/home/Hero';
import { Manifesto } from '@/components/home/Manifesto';
import { OriginMap } from '@/components/home/OriginMap';
import { FeaturedBeans } from '@/components/home/FeaturedBeans';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhatsInTheBox } from '@/components/home/WhatsInTheBox';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { FinalCTA } from '@/components/home/FinalCTA';

export default async function HomePage() {
  const beans = await getAllBeans();

  return (
    <>
      <Hero />
      <Manifesto />
      <OriginMap />
      <FeaturedBeans beans={beans} />
      <HowItWorks />
      <WhatsInTheBox />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
