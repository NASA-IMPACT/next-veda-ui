import React from 'react';
import { Card } from '@trussworks/react-uswds';
import './SmallCard.scss';

export interface SmallCardProps
  extends Omit<React.ComponentProps<typeof Card>, 'gridLayout'> {
  children: React.ReactNode;
  className?: string;
}

export const SmallCard: React.FC<SmallCardProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <Card
      gridLayout={{ desktop: { col: 4 }, tablet: { col: 6 } }}
      className={`small-card ${className}`}
      {...props}
    >
      {children}
    </Card>
  );
};

export default SmallCard;
