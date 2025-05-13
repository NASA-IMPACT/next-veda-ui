import type { MDXComponents } from 'mdx/types';
import { SafeLink } from 'app/components/mdx-components/safe-link';

import { SideNav } from '@trussworks/react-uswds';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: SafeLink,
    SideNav,
  };
}
