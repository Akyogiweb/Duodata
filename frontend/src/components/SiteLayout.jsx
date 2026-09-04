import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

export default function SiteLayout({ children, className }) {
  return (
    <div className={cn('min-h-screen relative', className)}>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
