"use client";

import { usePathname } from 'next/navigation';

export default function SchemaBreadcrumbs() {
  const pathname = usePathname() || '/';
  
  // Don't render breadcrumbs for home page
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter(Boolean);
  
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.womensipalliance.com/"
      },
      ...paths.map((path, index) => {
        // Build the URL up to this point
        const urlPath = '/' + paths.slice(0, index + 1).join('/');
        // Format the name (capitalize, replace hyphens)
        const name = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": name,
          "item": `https://www.womensipalliance.com${urlPath}`
        };
      })
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
