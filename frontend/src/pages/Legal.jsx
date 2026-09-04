import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';

const LEGAL_CONTENT = {
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    description: 'How Duodata collects, uses, and protects your information.',
    sections: [
      {
        heading: 'Overview',
        body: 'Duodata respects your privacy. This policy describes what information we collect when you visit our website, request a demo, or use our services — and how we use it.',
      },
      {
        heading: 'Information we collect',
        body: 'We may collect contact information (name, email, company), usage data from our website, and information you provide when booking a demo or contacting us.',
      },
      {
        heading: 'How we use information',
        body: 'We use this information to respond to inquiries, provide our services, improve our website, and communicate with you about Duodata. We do not sell your personal information.',
      },
      {
        heading: 'Contact',
        body: 'For privacy questions, contact us at privacy@duodata.ai.',
      },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms of Service',
    description: 'Terms governing use of the Duodata website and services.',
    sections: [
      {
        heading: 'Agreement',
        body: 'By accessing the Duodata website or using our services, you agree to these terms. If you do not agree, please do not use our services.',
      },
      {
        heading: 'Services',
        body: 'Duodata provides a platform for governed business meaning and technical implementation. Specific service terms are defined in your enterprise agreement.',
      },
      {
        heading: 'Acceptable use',
        body: 'You agree to use Duodata only for lawful purposes and in accordance with these terms and any applicable enterprise agreement.',
      },
      {
        heading: 'Contact',
        body: 'For questions about these terms, contact legal@duodata.ai.',
      },
    ],
  },
  status: {
    eyebrow: 'System',
    title: 'Service Status',
    description: 'Current operational status of Duodata services.',
    sections: [
      {
        heading: 'All systems operational',
        body: 'Duodata marketing website and core platform services are operating normally. For enterprise customers with dedicated environments, status is communicated through your account team.',
      },
      {
        heading: 'Incidents',
        body: 'No active incidents. Historical incident reports are available to enterprise customers upon request.',
      },
      {
        heading: 'Subscribe to updates',
        body: 'Enterprise customers receive status updates through their designated support channel. For general inquiries, contact support@duodata.ai.',
      },
    ],
  },
};

export default function LegalPage({ slug }) {
  const content = LEGAL_CONTENT[slug];

  if (!content) {
    return (
      <SiteLayout>
        <div className="pt-40 pb-32 text-center">
          <p className="text-slate-500">Page not found.</p>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow={content.eyebrow} title={content.title} description={content.description} size="narrow" />
      <Container size="narrow" className="pb-24 prose max-w-none">
        {content.sections.map((section) => (
          <div key={section.heading} className="mb-10">
            <h2 className="hero-headline text-[24px] text-slate-950 mb-3">{section.heading}</h2>
            <p className="text-[15px] leading-relaxed text-slate-600">{section.body}</p>
          </div>
        ))}
      </Container>
    </SiteLayout>
  );
}
