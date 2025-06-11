'use client';
import React from 'react';
import Link from 'next/link';
import { CardBadgeContent } from './CardBadge';
import { Grid, GridContainer, Icon, Card, CardMedia, CardBody } from "@trussworks/react-uswds"
import './ExternalResource.scss';

type ExternalResource = {
  title: string;
  description: string;
  linkURL: string;
  imgSrc: string;
  imgAlt: string;
}

export function StoryCard({title, description, linkURL, imgSrc, imgAlt}:ExternalResource) {
  return <Card layout='flagDefault' className='usa-list--unstyled'
   gridLayout={{
    tablet: {
      col: 6
    }}}
    containerProps = {{ "className": 'story-card'}}
  >
      <CardMedia>
        <img src={imgSrc} alt={imgAlt} />
      </CardMedia>
      <CardBody>
          <div>
            <CardBadgeContent label='External Link' icon='Link' />
          </div>
          <div className='margin-top-2'>
            <h2 className='card-title text-uppercase margin-bottom-1 font-sans-md'>
              <span>{title}</span>
              <Icon.ArrowForward
                className='arrow-icon'
                size={3}
                aria-label={`View story`}
              />
            </h2>
            <p className='font-sans-3xs'>
            {description}
            </p>
          </div>
          <Link
            className='position-absolute top-0 left-0 width-full height-full'
            href={linkURL}
            aria-label={`Link to the external resource.`}
          />
      </CardBody>
    </Card>
}

export function ExternalResources ({resources}: {resources: ExternalResource[]}) {
  return <GridContainer containerSize='desktop-lg' className='margin-top-8'>
        <Grid row className='margin-bottom-4'>
          <ul className='usa-card-group'>
          {resources.map(story => <StoryCard key={story.title} {...story}/> )}
        </ul>
        </Grid>
      </GridContainer>
}


