'use client';
import React, { useEffect, useState } from 'react';
import { Link, SideNav as USWDSSideNav } from '@trussworks/react-uswds';
import useActiveSection from 'app/hooks/use-active-section';

const SECTION_HEADING = 'h2';

export default function SideNav() {
  const [sectionIds, setSectionIds] = useState<string[]>([]);

  // On page mount, get the ids of h3 elements, which should be the topmost
  // headers on the MDX page.
  useEffect(() => {
    const ids = Array.from(document.querySelectorAll(SECTION_HEADING))
      .map((heading) => heading.id)
      .filter(Boolean);
    setSectionIds(ids);
  }, []);

  const activeSection = useActiveSection(sectionIds);

  return (
    <aside>
      <p className='margin-top-0 margin-bottom-2 text-bold'>On this page</p>
      <USWDSSideNav
        items={sectionIds.map((id, i) => (
          <Link
            key={id}
            href={`#${id}`}
            className={`usa-side-nav__link text-capitalize text-primary ${
              activeSection === id || (!activeSection && i == 0)
                ? 'usa-current'
                : ''
            }`}
          >
            {id}
          </Link>
        ))}
      />
    </aside>
  );
}
