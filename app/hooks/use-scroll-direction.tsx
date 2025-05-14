import { useEffect, useState } from 'react';

export default function useScrollDirection(): boolean {
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
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);
  return scrollingUp;
}
