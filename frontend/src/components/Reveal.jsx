import React from 'react';
import useInView from '@/hooks/useInView';

/**
 * Wrap children with a scroll-triggered reveal.
 * Adds `data-reveal="in"` when inside the viewport; CSS handles fade + translate.
 */
const Reveal = ({ children, delay = 0, className = '', as: Tag = 'div', ...rest }) => {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      data-reveal={inView ? 'in' : 'out'}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal-block ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
