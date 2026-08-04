import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/adminwipa', '/success', '/cancel'],
    },
    sitemap: 'https://www.womensipalliance.com/sitemap.xml',
  };
}
