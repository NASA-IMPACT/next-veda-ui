// Function to generate preview pathname based on content type and document
const getPreviewPathname = (uid, { locale, document }): string => {
  const { slug } = document;

  // Handle different content types with their specific URL patterns
  switch (uid) {
    // Handle pages with predefined routes
    case 'api::page.page':
      switch (slug) {
        case 'homepage':
          return `/${locale}`; // Localized homepage
        case 'pricing':
          return '/pricing'; // Pricing page
        case 'contact':
          return '/contact'; // Contact page
        case 'faq':
          return '/faq'; // FAQ page
      }
    // Handle product pages
    case 'api::product.product': {
      if (!slug) {
        return '/products'; // Products listing page
      }
      return `/products/${slug}`; // Individual product page
    }
    // Handle blog articles
    case 'api::article.article': {
      if (!slug) {
        return '/stories'; // Blog listing page
      }
      return `/blog/${slug}`; // Individual article page
    }
    default: {
      return null;
    }
  }
};

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env.STRAPI_ADMIN_FRONT_END_URL],
      async handler(uid, { documentId, locale, status, slug }) {

        // Fetch the complete document from Strapi
        const document = await strapi.documents(uid).findOne({ documentId });

        // Generate the preview pathname based on content type and document
        const pathname = getPreviewPathname(uid, { locale, document });

        // Disable preview if the pathname is not found
        if (!pathname) {
          return null;
        }

        // Use Next.js draft mode passing it a secret key and the content-type status
        const urlSearchParams = new URLSearchParams({
          url: pathname,
          secret: env.ADMIN_JWT_SECRET,
        });
        return `${env.STRAPI_ADMIN_FRONT_END_URL}/api/${urlSearchParams}`;
      },
    },
  },
});
