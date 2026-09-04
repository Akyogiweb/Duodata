import React from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import DuoArchitecture from '@/components/DuoArchitecture';
import GetStarted from '@/components/GetStarted';
import ExperienceTopics from '@/components/ExperienceTopics';
import FeatureConnection from '@/components/FeatureConnection';
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
import TrustStrip from '@/components/TrustStrip';
import SiteFaq from '@/components/SiteFaq';
import { CTA, Testimonials, UseCases } from '@/components/Sections';
import Footer from '@/components/Footer';
import { useExperience } from '@/context/ExperienceContext';

const Landing = () => {
  const { isBusiness } = useExperience();

  return (
    <div className="min-h-screen relative">
      <Nav />
      <Hero />
      <DuoArchitecture />
      <GetStarted />
      <ExperienceTopics />
      <FeatureConnection />
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
      <UseCases />
      <Testimonials />
      <VideoShowcase />
      <TrustStrip />
      <SiteFaq />
      <AudienceBridge />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
