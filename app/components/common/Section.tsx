import React from 'react';

export const SectionHeader = ({
  title,
  className = '',
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2 className={`text-uppercase font-body-lg ${className}`}>{title}</h2>
  );
};

export function Section({
  children,
  full = false,
}: {
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <section className='usa-section'>
      <div className={full ? 'grid-container-widescreen' : 'grid-container'}>
        {children}
      </div>
    </section>
  );
}
