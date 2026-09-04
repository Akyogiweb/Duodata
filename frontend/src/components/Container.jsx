import React from 'react';
import { cn } from '@/lib/utils';

const SIZES = {
  content: 'max-w-site-content',
  narrow: 'max-w-site-narrow',
  wide: 'max-w-site-wide',
  faq: 'max-w-site-faq',
};

export default function Container({ size = 'content', className, children, as: Tag = 'div' }) {
  return (
    <Tag className={cn('mx-auto px-6 w-full', SIZES[size], className)}>
      {children}
    </Tag>
  );
}
