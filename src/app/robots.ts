import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/adminwipa', '/success', '/cancel'],
      },
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'Google-Extended', 'CCBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://www.womensipalliance.com/sitemap.xml',
  };
}
