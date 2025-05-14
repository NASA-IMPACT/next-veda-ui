export const baseUrl = process.env.DOMAIN_PROD;

const additionalRoutes = ['about'];

export default async function sitemap() {
  const routes = ['', ...additionalRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
