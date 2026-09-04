/** Central navigation config — single source of truth for nav and footer links. */

export const primaryNavLinks = (isBusiness) => [
  { label: 'Product', href: '/#product', type: 'anchor', sectionId: 'product' },
  { label: 'Start', href: '/#start', type: 'anchor', sectionId: 'start' },
  { label: 'Topics', href: '/#experience', type: 'anchor', sectionId: 'experience' },
  { label: 'Connection', href: '/#connection', type: 'anchor', sectionId: 'connection' },
  ...(isBusiness ? [] : [{ label: 'Workspace', href: '/explore', type: 'route' }]),
  { label: 'Videos', href: '/videos', type: 'route' },
  { label: 'Case Studies', href: '/case-studies', type: 'route' },
];

const productLinks = (isBusiness) => [
  { label: 'How to get started', href: '/#start' },
  { label: 'Feature connection', href: '/#connection' },
  { label: 'Shared semantics', href: '/#product' },
  ...(isBusiness ? [] : [{ label: 'Workspace', href: '/explore' }]),
  { label: 'Videos', href: '/videos' },
  { label: 'Case studies', href: '/case-studies' },
];

const businessTopicLinks = [
  { label: 'Purpose', href: '/#purpose' },
  { label: 'Metric consistency', href: '/#metric-consistency' },
  { label: 'Clarity', href: '/#clarity' },
  { label: 'AI', href: '/#business-ai' },
];

const technicalTopicLinks = [
  { label: 'Metric ontology', href: '/#metric-ontology' },
  { label: 'AI governance', href: '/#ai-governance' },
  { label: 'Semantic layer', href: '/#semantic-layer' },
  { label: 'Data lineage', href: '/#data-lineage' },
  { label: 'AI reliability', href: '/#ai-reliability' },
];

const companyLinks = [
  { label: 'Security', href: '/#security' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#get-started' },
];

export const footerColumns = (isBusiness) => [
  { title: 'Product', links: productLinks(isBusiness) },
  {
    title: isBusiness ? 'Business topics' : 'Technical topics',
    links: isBusiness ? businessTopicLinks : technicalTopicLinks,
  },
  { title: 'Company', links: companyLinks },
];

export const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Security', href: '/#security' },
  { label: 'Status', href: '#' },
];
