'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * This fixes a very strange scroll bug in Next.js
 *
 * There are a few reports that navigating to a new page doesn't scroll to the top,
 * even after trying things like:
 * - removing `overflow: hidden` or `height: 100%` from html/body or other elements
 * - removing sticky elements (e.g. sticky header)
 * - explicitly setting `scroll={true}` to `<Link>` components
 *
 * This `requestAnimationFrame` waits until the page has fully rendered
 * before forcing scroll to top. It’s a workaround, but the only reliable one for now.
 *
 * See: https://github.com/vercel/next.js/discussions/69993, https://github.com/vercel/next.js/discussions/45715
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }, [pathname]);

  return null;
}
