import React from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import ProductScreenshot from '@/components/ProductScreenshot';
import LineageDiagram from '@/components/LineageDiagram';
import FeatureBlocks from '@/components/FeatureBlocks';
import DataSourcesSection from '@/components/DataSourcesSection';
import { UseCases, Testimonials, CTA } from '@/components/Sections';
import Footer from '@/components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <LogoMarquee />
      <ProductScreenshot />
      <LineageDiagram />
      <FeatureBlocks />
      <DataSourcesSection />
      <UseCases />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
