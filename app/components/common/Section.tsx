import React from 'react';

export function Section({
  children,
  full = false,
}: {
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <section className='usa-section'>
      <div className={`grid-container${full ? '-full' : ''}`}>{children}</div>
    </section>
  );
}
