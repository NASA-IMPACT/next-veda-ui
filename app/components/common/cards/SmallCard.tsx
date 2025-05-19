import React from 'react';
import { Card } from '@trussworks/react-uswds';

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
      className={`${className} maxw-small-card`}
      {...props}
    >
      {children}
    </Card>
  );
};

export default SmallCard;
