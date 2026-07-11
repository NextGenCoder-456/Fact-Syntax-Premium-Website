import Hero from '@/components/sections/Hero';
import FeaturedCategories from '@/components/sections/FeaturedCategories';
import LatestVideos from '@/components/sections/LatestVideos';
import FeaturedArticles from '@/components/sections/FeaturedArticles';
import CreatorSection from '@/components/sections/CreatorSection';
import Statistics from '@/components/sections/Statistics';
import Timeline from '@/components/sections/Timeline';
import FeaturedSeries from '@/components/sections/FeaturedSeries';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Newsletter from '@/components/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <LatestVideos />
      <Statistics />
      <FeaturedArticles />
      <CreatorSection />
      <Timeline />
      <FeaturedSeries />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}
