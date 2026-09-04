import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const VARIANTS = {
  primary: 'pill-btn-primary',
  ghost: 'pill-btn-ghost',
  dark: 'pill-btn-dark',
  onBlue: 'pill-btn-on-blue',
  outline: 'pill-btn-ghost border border-black/10',
};

/**
 * Brand-consistent button used across marketing pages.
 * Prefer this over ad-hoc shadcn Button styling on public-facing pages.
 */
export default function DuoButton({
  variant = 'primary',
  className,
  href,
  to,
  children,
  ...props
}) {
  const cls = cn(VARIANTS[variant] || VARIANTS.primary, className);

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}
