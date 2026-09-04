import React from 'react';
import Container from '@/components/Container';

export default function PageHeader({ eyebrow, title, description, children, size = 'content' }) {
  return (
    <header className="pt-32 pb-16">
      <Container size={size}>
        {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
        {title && <h1 className="hero-headline page-title">{title}</h1>}
        {description && <p className="page-description">{description}</p>}
        {children}
      </Container>
    </header>
  );
}
