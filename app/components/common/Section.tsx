import React from 'react';

export const SectionHeader = ({ title }: { title: string }) => {
  return <h2 className='text-uppercase font-body-lg'>{title}</h2>;
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
      <div className={full ? '' : 'grid-container'}>{children}</div>
    </section>
  );
}
