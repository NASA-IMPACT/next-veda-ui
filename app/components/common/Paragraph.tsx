import React from 'react';

export function Paragraph({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <p
      className={`font-body-sm line-height-body-4 ${className || ''}`}
      {...props}
    >
      {children}
    </p>
  );
}
