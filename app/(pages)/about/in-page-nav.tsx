'use client';
import React, { useEffect, useState } from 'react';
import useActiveSection from 'app/hooks/use-active-section';
import Link from 'next/link';

const SECTION_HEADING = 'h2';

export default function SideNav() {
  const [sectionIds, setSectionIds] = useState<string[]>([]);

  // On page mount, get the ids of all section headings, which should be the topmost
  // elements on the MDX page for each section.
  useEffect(() => {
    const ids = Array.from(document.querySelectorAll(SECTION_HEADING))
      .map((heading) => heading.id)
      .filter(Boolean);
    setSectionIds(ids);
  }, []);

  const activeSection = useActiveSection(sectionIds);

  const formatSectionTitle = (id: string) => {
    return id
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getDisplayTitle = (id: string) => {
    const heading = document.getElementById(id);
    return heading?.getAttribute('data-title') || formatSectionTitle(id);
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView();

      window.history.replaceState(null, '', `#${id}`);

      // Keep focus on the clicked link to maintain USWDS-compliant behavior
      // This allows users to continue navigating with keyboard after clicking
      (event.currentTarget as HTMLAnchorElement).focus();
    }
  };

  return (
    <aside className='usa-in-page-nav'>
      <nav aria-label='On this page' className='usa-in-page-nav__nav'>
        <p className='usa-in-page-nav__heading' tabIndex={0}>
          On this page
        </p>
        <ul className='usa-in-page-nav__list'>
          {sectionIds.map((id, i) => (
            <li
              key={id}
              className={`usa-in-page-nav__item usa-in-page-nav__item--primary ${
                activeSection === id || (!activeSection && i === 0)
                  ? 'usa-current'
                  : ''
              }`}
            >
              <Link
                href={`#${id}`}
                className='usa-in-page-nav__link'
                onClick={(event) => handleLinkClick(event, id)}
              >
                {getDisplayTitle(id)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
