import React from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import DuoArchitecture from '@/components/DuoArchitecture';
import BusinessStory from '@/components/BusinessStory';
import TechnicalStory from '@/components/TechnicalStory';
import LogoMarquee from '@/components/LogoMarquee';
import ProductScreenshot from '@/components/ProductScreenshot';
import LineageDiagram from '@/components/LineageDiagram';
import FeatureBlocks from '@/components/FeatureBlocks';
import DataSourcesSection from '@/components/DataSourcesSection';
import { UseCases, Testimonials, CTA } from '@/components/Sections';
import Footer from '@/components/Footer';
import { useExperience } from '@/context/ExperienceContext';

const Landing = () => {
  const { isBusiness } = useExperience();

  return (
    <div className="min-h-screen relative">
      <Nav />
      <Hero />
      <DuoArchitecture />
      {isBusiness ? <BusinessStory /> : <TechnicalStory />}
      <LogoMarquee />
      {!isBusiness && (
        <>
          <ProductScreenshot />
          <LineageDiagram />
          <DataSourcesSection />
        </>
      )}
      <FeatureBlocks />
      <UseCases />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
