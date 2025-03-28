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
      return `/stories/${slug}`; // Individual article page
    }
    default: {
      return null;
    }
  }
};
export default ({ env }) => {
  const clientUrl = env('CLIENT_URL'); // Frontend application URL
  const previewSecret = env('REACT_APP_PREVIEW_SECRET');

  return {
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
        allowedOrigins: `http://localhost:3000`,
        async handler(uid, { documentId, locale, status }) {
          const document = await strapi.documents(uid).findOne({ documentId });
          const pathname = getPreviewPathname(uid, { locale, document });
          const urlSearchParams = new URLSearchParams({
            url: pathname,
            secret:
              '4bcb32d1c99897f5e3d1a94809d929e31acee15439a9b859eaf694c8d1c248f5210170887489d12a645dd6c2da08c2a1e65b197dc0621ab47b3b774bdaed1cc8a98b6c8b842b5dc1e9e41a2d0742c9e4a9df641539b5852039feda051b5e5c7a9451d267047955d4f882a33862c2010595f4fa409d8dae027b40b4e7dc56c29c',
            status,
          });
          console.log('status', status);
          if (status === 'published') {
            return `http://localhost:3000/api/preview?${urlSearchParams}`;
          }
          return `http://localhost:3000/api/draft?${urlSearchParams}`;
        },
      },
    },
  };
};
