# Overview of architecture

This document provides a high-level overview of the architecture for the Next.js instance integrated with VEDA-UI.

## Core structure

The project follows the modern Next.js file structure as documented in the [Next.js documentation](https://nextjs.org/docs/app/building-your-application). Key directories include:

### `app/`
- Contains the application’s core pages, layouts, and routes
- **Structure**: Each folder under `app/` corresponds to a route in the application
  Example: `app/about/page.tsx` maps to `/about`

### `components/`
- Stores reusable React components for the app

### `content/`
- Holds structured content, such as datasets, events, or other resources used by the app

### `lib/`
- Serves as a centralized module for importing and exporting components, hooks, and utilities from `@teamimpact/veda-ui` that are used across the application

### `store/`
- **Purpose**: Manages application-level state using React context providers

### `styles/`
- Includes global styles and theme configurations.
    - **Global styles**: `styles/index.scss` applies general app-wide styles
    - **Theme styles**: `_uswds-theme.scss` is the configuration for the U.S. Web Design System (USWDS) specific for this app

For details on how USWDS components and styles are used in the project, refer to the [Styling guide](./STYLING.md).

### `utilities/hooks/`
- Custom React hooks to enhance reusability and abstraction of logic

For detailed instructions on setting up and running the project, refer to the [Development guide](./DEVELOPMENT.md).
