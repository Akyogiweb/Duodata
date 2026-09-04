import React from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import DuoArchitecture from '@/components/DuoArchitecture';
import ExperienceTopics from '@/components/ExperienceTopics';
import AudienceBridge from '@/components/AudienceBridge';
import LogoMarquee from '@/components/LogoMarquee';
import BusinessMeanings from '@/components/BusinessMeanings';
import LineageDiagram from '@/components/LineageDiagram';
import MeaningProblem from '@/components/sections/MeaningProblem';
import MetricDetail from '@/components/sections/MetricDetail';
import AISection from '@/components/sections/AISection';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Governance from '@/components/sections/Governance';
import GitBridge from '@/components/sections/GitBridge';
import PlatformIntegration from '@/components/sections/PlatformIntegration';
import MegaDiagram from '@/components/sections/MegaDiagram';
import TwoSides from '@/components/sections/TwoSides';
import VideoShowcase from '@/components/VideoShowcase';
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
      {isBusiness ? (
        <>
          <MeaningProblem />
          <MetricDetail />
          <AISection />
          <BeforeAfter />
          <BusinessMeanings />
        </>
      ) : (
        <>
          <Governance />
          <GitBridge />
          <PlatformIntegration />
          <LineageDiagram />
          <MegaDiagram />
        </>
      )}
      <LogoMarquee />
      <TwoSides />
      <VideoShowcase />
      <AudienceBridge />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
