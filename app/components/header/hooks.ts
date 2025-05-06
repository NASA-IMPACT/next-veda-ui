import { useEffect, useRef, useState } from 'react';
/**
 * Hook to set the header height as a CSS custom property.
 *
 * @returns A ref to be attached to the header element to measure the height.
 */

export function useHeaderHeight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const headerHeight = ref.current?.offsetHeight || 0;

      // Set CSS custom property on :root or html element
      document.documentElement.style.setProperty(
        '--header-height',
        `${headerHeight}px`,
      );
    };

    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return ref;
}

export function useScrollDirection(): boolean {
  const [scrollingUp, setScrollingUp] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition < scrollPosition) {
        setScrollingUp(true);
      } else if (currentScrollPosition > scrollPosition) {
        setScrollingUp(false);
      }
      setScrollPosition(currentScrollPosition)
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, [scrollPosition])
  return scrollingUp;
}