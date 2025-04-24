import { useEffect, useRef, useState } from 'react';
/**
 * Hook to set the header height as a CSS custom property.
 *
 * @returns A ref to be attached to the header element to measure the height.
 */

export default function useHeaderHeight() {
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

export function useTransparentHeader(containerRef, options) {
  // const containerRef = useRef<HTMLDivElement>(null);
  const [ isVisible, setIsVisible ] = useState(false);

  // const callbackFn = (entries) => {
  //   const [ entry ] = entries;
  //   console.log(`entry.IsIntersecting?: `, entry.IsIntersecting)
  //   setIsVisible(entry.IsIntersecting)
  // }

  // useEffect(() => {
  //   const observer = new IntersectionObserver(callbackFn, options);
  //   if (containerRef.current) observer.observe(containerRef.current);

  //   return () => {
  //     if (containerRef.current) observer.unobserve(containerRef.current)
  //   }
  // }, [containerRef, options])

  useEffect(() => {
    const observer = new IntersectionObserver(([ entry ]) => {
      console.log(`entry.isIntersecting: `, entry.isIntersecting)
      setIsVisible(entry.isIntersecting);
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

  // return [containerRef, isVisible];
  return isVisible;
}
