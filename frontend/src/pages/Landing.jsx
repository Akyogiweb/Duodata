import React from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import { Testimonials, CTA } from '@/components/Sections';
import Footer from '@/components/Footer';

// New narrative sections
import MeaningProblem from '@/components/sections/MeaningProblem';
import ModernDataProblem from '@/components/sections/ModernDataProblem';
import TwoSides from '@/components/sections/TwoSides';
import MetricsOntology from '@/components/sections/MetricsOntology';
import MetricDetail from '@/components/sections/MetricDetail';
import Governance from '@/components/sections/Governance';
import GitBridge from '@/components/sections/GitBridge';
import PlatformIntegration from '@/components/sections/PlatformIntegration';
import SemanticLayerLoop from '@/components/sections/SemanticLayerLoop';
import AISection from '@/components/sections/AISection';
import Industries from '@/components/sections/Industries';
import BeforeAfter from '@/components/sections/BeforeAfter';
import CompetitiveCategories from '@/components/sections/CompetitiveCategories';
import MegaDiagram from '@/components/sections/MegaDiagram';

// Dark-banner visualizations (baseline design)
import LemniscateBanner from '@/components/banners/LemniscateBanner';
import AtomicOntologyBanner from '@/components/banners/AtomicOntologyBanner';
import IcosahedronBanner from '@/components/banners/IcosahedronBanner';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <LogoMarquee />

      {/* Problem narrative */}
      <MeaningProblem />
      <ModernDataProblem />

      {/* Positioning banner + section */}
      <LemniscateBanner />
      <TwoSides />

      {/* Ontology banner + intro + cards */}
      <AtomicOntologyBanner />
      <MetricsOntology />

      {/* Big Metric Ontology hero banner + metric detail */}
      <IcosahedronBanner />
      <MetricDetail />

      {/* Governance & Git */}
      <Governance />
      <GitBridge />

      {/* Platforms & lifecycle */}
      <PlatformIntegration />
      <SemanticLayerLoop />

      {/* AI */}
      <AISection />

      {/* Industries */}
      <Industries />

      {/* Before / After + Category positioning */}
      <BeforeAfter />
      <CompetitiveCategories />

      {/* Mega interactive diagram */}
      <MegaDiagram />

      {/* Proof + CTA */}
      <Testimonials />
      <CTA />

      <Footer />
    </div>
  );
};

export default Landing;
