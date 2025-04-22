import { useEffect } from 'react';
import useClickOutside from './use-click-outside';
import { USWDS_DESKTOP_BREAKPOINT } from '@utils/constants';

/**
 * Hook to handle mobile menu behavior, closing
 * when screen size changes to desktop.
 *
 * Would be better to have this fixed on the react-uswds side!
 *
 * Subscribe to https://github.com/trussworks/react-uswds/issues/2586
 * for updates
 * */
export default function useMobileMenuFix(
  expanded: boolean,
  setExpanded: (expanded: boolean) => void,
) {
  const ref = useClickOutside(() => setExpanded(false));

  const handleResize = () => {
    if (window.innerWidth > USWDS_DESKTOP_BREAKPOINT && expanded) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]); // We want to register the event listeners only once, when the component mounts, and when the expanded state changes
  return ref;
}
