import React from 'react';

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className='font-body-sm line-height-160 letter-spacing-0'>{children}</p>
  );
}
