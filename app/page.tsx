import React from 'react';
import Link from 'next/link';
import { getStoriesMetadata } from 'app/content/utils/mdx';

const mainTopSectionData = [
  {
    title: 'Earth scientists',
    description:
      'Easily access high quality Earth data from NASA and its associated partners',
  },
  {
    title: 'Academic researchers',
    description:
      'Support your research efforts with an open source cloud-computing platform backed by NASA data.',
  },
  {
    title: 'Science enthusiasts',
    description:
      'Easily access high quality Earth data from NASA and its associated partners',
  },
];

const featuredStories = getStoriesMetadata()
  .map((d) => ({
    ...d.metadata,
    path: `stories/${d.slug}`,
  }))
  .filter((_d, idx) => idx < 3);

const topStory = featuredStories[0];
const otherStories = featuredStories.slice(1);

export default function HomePage() {
  return (
    <section>
      <div className='grid-container'>
        <div className='grid-row margin-top-5'>
          <h2>
            VEDA Template is here to help scientists to engage with wider
            audience
          </h2>
        </div>
        <div className='grid-row grid-gap-lg card--homepage-main margin-top-2'>
          {mainTopSectionData.map((d) => {
            return (
              <div
                key={d.title}
                className='tablet:grid-col text-center padding-5'
              >
                <div>
                  <img
                    className='radius-pill'
                    src='https://placehold.co/400x400'
                  ></img>
                </div>
                <div className='margin-top-3'>
                  <h3>{d.title}</h3>
                  <p className='margin-top-1'>{d.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className='grid-row margin-top-5'>
          <h2>Featured Data Stories</h2>
        </div>
        <div className='grid-row grid-gap-md  margin-top-2'>
          <div className='tablet:grid-col-6'>
            <div
              className='card--homepage-topstory text-base-lightest radius-md display-flex flex-align-end padding-2'
              style={{ backgroundImage: `url(${topStory.media?.src})` }}
            >
              <div className='card--homepage-topstory-text'>
                <h3> {topStory.name}</h3>
                <p className='margin-top-1'> {topStory.description}</p>
              </div>
              <Link className='link--block' href={topStory.path} />
            </div>
          </div>
          <div className='tablet:grid-col-6'>
            {otherStories.map((d) => {
              return (
                <div key={d.id} className='grid-row'>
                  <div className='tablet:grid-col'>
                    <div
                      className='card--homepage-substory text-base-lightest radius-md display-flex flex-align-end padding-2'
                      style={{ backgroundImage: `url(${d.media?.src})` }}
                    >
                      <div className='card--homepage-topstory-text'>
                        <h3> {d.name}</h3>
                        <p className='margin-top-1'> {d.description}</p>
                      </div>
                      <Link className='link--block' href={d.path} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='tablet:grid-col-6'>
            <Link
              href='/editor'
              className='bg-blue-500 hover:bg-blue-600 font-semibold py-3 px-6 rounded-lg inline-block transition-colors'
            >
              Open MDX Editor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
