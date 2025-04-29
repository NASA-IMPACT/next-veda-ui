import React from 'react';

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className='font-body-sm line-height-body-4'>{children}</p>;
}
