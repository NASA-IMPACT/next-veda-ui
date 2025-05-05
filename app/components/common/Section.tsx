import React from 'react';

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className='usa-section'>
      <div className='grid-container'>{children}</div>
    </section>
  );
}
