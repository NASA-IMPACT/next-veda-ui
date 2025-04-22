'use client';
import React, { useEffect, useState } from 'react';
import { SideNav } from '@trussworks/react-uswds';
import useActiveSection from '@utils/hooks/use-active-section';

const SECTION_HEADING = 'h2';

export default function AboutSideNav() {
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
      <p className='margin-y-2'>On this page</p>
      <SideNav
        items={sectionIds.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-capitalize ${
              activeSection === id || (!activeSection && i == 0)
                ? 'usa-current'
                : ''
            }`}
          >
            {id}
          </a>
        ))}
      />
    </aside>
  );
}
