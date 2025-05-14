import { useState, useEffect } from 'react';

const DEFAULT_HEIGHT = 100;

export default function useElementHeight({
  queryToSelect,
}: {
  queryToSelect: string;
}): number | null {
  const [headerHeight, setHeaderHeight] = useState<number | null>(
    DEFAULT_HEIGHT,
  );

  useEffect(() => {
    const matchingElement = document.querySelector<HTMLElement>(queryToSelect);
    if (matchingElement) {
      const updateHeaderHeight = () => {
        setHeaderHeight(matchingElement.offsetHeight);
      };
      // Initial height check
      updateHeaderHeight();
      // Add a resize observer to update height on resize
      const resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight();
      });
      resizeObserver.observe(matchingElement);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      console.warn(`No matching element for ${queryToSelect} found.`);
    }
    // Runs once on mount
  }, []);

  return headerHeight;
}
