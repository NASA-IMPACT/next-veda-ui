'use client';
import React from 'react';
import Link from 'next/link';
import { CardBadgeContent } from './CardBadge';
import { Icon, Card, CardMedia, CardBody } from "@trussworks/react-uswds"
import './StoryCard.scss';

const plaecholderImage = 'https://placehold.co/150x200';

export default function StoryCard() {
  return    <Card layout='flagDefault' className='usa-list--unstyled'
   gridLayout={{
    tablet: {
      col: 6
    }}}
    containerProps = {{ "className": 'story-card'}}
  >
      <CardMedia>
        <img src={plaecholderImage} alt='' />
      </CardMedia>
      <CardBody>
          <div className='margin-top-0'>
            <CardBadgeContent label='External Link' icon='Language' />
          </div>
          <div className='margin-top-2'>
          <h2 className='card-title text-uppercase margin-bottom-1'>
            <span>title</span>
            <Icon.ArrowForward
              className='arrow-icon'
              size={3}
              aria-label={`View story`}
            />
          </h2>
           Sentences
          </div>
          <Link
            className='position-absolute top-0 left-0 width-full height-full'
            href={`#`}
            aria-label={`View 
              eme details.`}
          />
      </CardBody>

    </Card>
}