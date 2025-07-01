import { useEffect, useState } from 'react';

/**
 * Returns the active section based on the intersection observer.
 * This hook gets the distance of the section from the top of the page and
 * returns the section with the smallest distance.
 *
 * @param sectionIds - The ids of the sections to observe
 * @returns The active section
 */
export default function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = new Map<string, number>();

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const distance = Math.abs(entry.boundingClientRect.top);
            visibleSections.set(entry.target.id, distance);
          }
        });

        if (visibleSections.size > 0) {
          const closestSection = Array.from(visibleSections.entries()).reduce(
            (closest, current) => {
              return current[1] < closest[1] ? current : closest;
            },
          );
          setActiveSection(closestSection[0]);
        }
      },
      {
        rootMargin: '-100px 0px -66% 0px',
        threshold: 0.01,
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sectionIds]);

  return activeSection;
}
