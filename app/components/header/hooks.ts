import { useEffect, useRef, useState, useContext } from 'react';
import { TransparentHeaderContext } from './transparent-header-context';
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

export function useIntersectionObserver(containerRef, options) {
  const [ isVisible, setIsVisible ] = useState(true);
  const { setTransparentHeader } = useTransparentHeader();

  useEffect(() => {
    const observer = new IntersectionObserver(([ entry ]) => {
      setIsVisible(entry.isIntersecting);
      setTransparentHeader(entry.isIntersecting);
    }, options);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ options, containerRef ]);
  return isVisible;
}

export const useTransparentHeader = () => useContext(TransparentHeaderContext);