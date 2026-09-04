import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import Hero from '@/components/Hero';
import DecisionAtom from '@/components/DecisionAtom';
import BusinessJourney from '@/components/BusinessJourney';
import TechnicalProposition from '@/components/TechnicalProposition';
import GetStarted from '@/components/GetStarted';
import ExperienceTopics from '@/components/ExperienceTopics';
import FeatureConnection from '@/components/FeatureConnection';
import AudienceBridge from '@/components/AudienceBridge';
import SalesProof from '@/components/SalesProof';
import LogoMarquee from '@/components/LogoMarquee';
import BusinessMeanings from '@/components/BusinessMeanings';
import LineageDiagram from '@/components/LineageDiagram';
import MeaningProblem from '@/components/sections/MeaningProblem';
import BusinessExecutivePain from '@/components/sections/BusinessExecutivePain';
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
import { useExperience } from '@/context/ExperienceContext';

const Landing = () => {
  const { isBusiness } = useExperience();

  return (
    <SiteLayout>
      <Hero />
      <LogoMarquee />
      <SalesProof />
      <Testimonials />
      {isBusiness ? (
        <>
          <BusinessJourney />
          <MeaningProblem />
          <ExperienceTopics />
          <BeforeAfter />
          <AISection />
          <BusinessExecutivePain />
          <DecisionAtom />
          <FeatureConnection />
          <BusinessMeanings />
          <UseCases />
          <GetStarted />
        </>
      ) : (
        <>
          <TechnicalProposition />
          <Governance />
          <GitBridge />
          <PlatformIntegration />
          <LineageDiagram />
          <MegaDiagram />
          <TwoSides />
          <UseCases />
        </>
      )}
      <VideoShowcase />
      <TrustStrip />
      <SiteFaq />
      <AudienceBridge />
      <CTA />
    </SiteLayout>
  );
};

export default Landing;
