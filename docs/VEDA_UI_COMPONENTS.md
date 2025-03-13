# VEDA-UI components

This document provides guidance on how to use and integrate VEDA-UI components into your application.

VEDA-UI offers a collection of components, hooks, and state management tools to support geospatial visualization, storytelling, and analysis. These are designed to be both reusable and customizable.

## Available components and features

The most up-to-date list of components, hooks, and types offered by VEDA-UI can be found in the [VEDA-UI `index.ts` file](https://github.com/NASA-IMPACT/veda-ui/blob/main/app/scripts/index.ts). This file serves as the single source of truth for all available features and their respective imports.

## Example usage

To use a VEDA-UI component, import it from the library and include it in your application. For example:

```tsx
import { PageHero, CatalogContent } from '@teamimpact/veda-ui';

export default function ExamplePage() {
  return (
    <div>
      <PageHero title="Explore Datasets" subtitle="Discover insights from geospatial data." />
      <CatalogContent datasets={[...]} />
    </div>
  );
}
```

# Customization and styling

All components follow USWDS-based theming and can be customized through SCSS or by overriding default styles. For detailed styling guidance, refer to the [Styling guide](./STYLING.md).

