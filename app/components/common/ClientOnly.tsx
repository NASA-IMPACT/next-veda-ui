'use client';

import React from 'react';

/**
 * Utility wrapper used for rendering it's children only on the client side (w/o SSR).
 *
 * This is useful when:
 * - A component relies on browser-only APIs (e.g. `window`, `document`)
 * - Third-party libraries that do not support SSR
 * - You want to interleave Server and Client Components
 *
 * Related to the Next.js composition pattern of interleaving Server and Client components:
 * https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#interleaving-server-and-client-components
 *
 * Typical usage: wrap client-only components from third-party libraries (e.g. veda-ui)
 * inside <ClientOnly> when rendering them within server-rendered content such as MDX files or server pages.
 * This keeps the rest of the server-rendered content intact (e.g. for SEO or when JS is disabled),
 * and prevents runtime errors when a client-only component is used in that context (e.g. as a carousel slide).
 */
export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
