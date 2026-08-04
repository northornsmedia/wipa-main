import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/adminwipa', '/success', '/cancel', '/api/', '/checkout'],
        crawlDelay: 2,
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'Google-Extended', 'CCBot', 'anthropic-ai', 'Claude-Web', 'ClaudeBot', 'cohere-ai', 'OmgiliBot', 'Omgili'],
        allow: '/',
      }
    ],
    sitemap: 'https://www.womensipalliance.com/sitemap.xml',
    host: 'https://www.womensipalliance.com',
  };
}
