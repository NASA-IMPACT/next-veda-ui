# Configuration

This document provides details on how to configure the application, manage environment variables, and use the VEDA UI configuration provider.

## Environment variables

The application uses `.env` and `.env.local` files to manage environment variables. Below is a breakdown of the variables used in the application:

### `.env` variables

These variables configure general API endpoints and settings that are safe to be exposed publicly. They are used to configure the application for production or public-facing environments and are committed to version control.

- **`NEXT_PUBLIC_API_STAC_ENDPOINT`**
    Defines the endpoint for accessing the STAC API

- **`NEXT_PUBLIC_GOOGLE_FORM`**
    URL for the Google Form used for user feedback and contact. When set, displays a "Contact Us" section on the About page. When not set, the feedback section is hidden.

    Example:

    ```env
    NEXT_PUBLIC_API_STAC_ENDPOINT='https://openveda.cloud/api/stac'
    NEXT_PUBLIC_API_RASTER_ENDPOINT='https://openveda.cloud/api/raster'
    NEXT_PUBLIC_GOOGLE_FORM='https://docs.google.com/forms/d/e/your-form-id/viewform'
    ```

### `.env variables`

These variables are specific to each developer’s local environment and often contain sensitive information like API keys or tokens. They should not be committed to version control. Instead, developers should copy the provided sample `.env.local.sample` file and rename it to `.env.local.`

### Using environment variables in code

The `VedaUIProvider` is part of the `@teamimpact/veda-ui` library and is used to pass environment variables to VEDA-UI components. This is needed so that VEDA components relying on configurations like API endpoints and Mapbox tokens can access these values.

#### Where to place it

The `VedaUIProvider` should wrap your application at a high level, such as in the `RootLayout` or a similar layout component, so that all VEDA-UI components within the application have access to the provided configurations.

#### Example usage

Below is an example of how to configure the `VedaUIProvider` with environment variables:

```tsx
import { VedaUIProvider } from '@teamimpact/veda-ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <VedaUIProvider
      config={{
        envMapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
        envApiStacEndpoint: process.env.NEXT_PUBLIC_API_STAC_ENDPOINT ?? '',
        envApiRasterEndpoint: process.env.NEXT_PUBLIC_API_RASTER_ENDPOINT ?? '',
      }}
    >
      {children}
    </VedaUIProvider>
  );
}
```
