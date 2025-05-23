import React from 'react';
import { EVENTS } from './events';

import './index.scss';


export default function Page() {
  return (
    <div className='grid-container'>
      <h1 className='font-sans-xl'>Events</h1>
      <p className='font-sans-md margin-top-1'>
        Lorem Ipsum
      </p>
      <div className='usa-card-group'>
        {
            EVENTS.map((event) => (
              <a key={event.id} className='usa-card grid-col' href='#'>
                <div className='usa-card__container margin-1'>
                  <div className='usa-card__header'>
                  <h4 className='usa-card__heading'>{event.title}</h4>
                  </div>
                  <div className='usa-card__media'>
                    <div className='usa-card__img'>
                      <img
                        src={event.image || 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg'}
                        alt={`${event.title} image`}
                      />
                    </div>
                  </div>
                  <div className='usa-card__body'>
                    <p>
                      {event.description}
                    </p>
                  </div>
                </div>
              </a>
            ))
        }
      </div>
    </div>
  );
}
