import React from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import DuoArchitecture from '@/components/DuoArchitecture';
import ExperienceTopics from '@/components/ExperienceTopics';
import AudienceBridge from '@/components/AudienceBridge';
import LogoMarquee from '@/components/LogoMarquee';
import BusinessMeanings from '@/components/BusinessMeanings';
import LineageDiagram from '@/components/LineageDiagram';
import { CTA } from '@/components/Sections';
import Footer from '@/components/Footer';
import { useExperience } from '@/context/ExperienceContext';

const Landing = () => {
  const { isBusiness } = useExperience();

  return (
    <div className="min-h-screen relative">
      <Nav />
      <Hero />
      <DuoArchitecture />
      <ExperienceTopics />
      <LogoMarquee />
      {isBusiness ? <BusinessMeanings /> : <LineageDiagram />}
      <AudienceBridge />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
