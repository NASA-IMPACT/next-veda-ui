import { useEffect, useRef } from 'react';
/**
 * Hook to detect clicks outside of a specified element.
 *
 * Would be better to have this fixed on the react-uswds side!
 *
 * Subscribe to https://github.com/trussworks/react-uswds/issues/2592
 * for updates
 *
 * @param onClose - Callback function to be called when a click outside is detected.
 * @returns A ref to be attached to the element to monitor for outside clicks.
 */

export default function useClickOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return ref;
}
