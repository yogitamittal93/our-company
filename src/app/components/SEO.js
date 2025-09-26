// SEO.js (Server Component)
export default function SEO({
  title,
  description,
  url,
  image,
  breadcrumbs = [],
  siteName = "Lakshmi Iron Company",
  organization = {
    name: "Lakshmi Iron Company",
    url: "https://yourdomain.com",
    logo: "/images/logo2.png",
    telephone: "+917973241912",
    sameAs: [
      "https://www.facebook.com/profile.php?id=61575197713560"
    ]
  },
  product = null // optional product schema
}) {
  // Breadcrumb schema
  const breadcrumbSchema = breadcrumbs.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.label,
          item: crumb.href
        }))
      }
    : null;

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    url: organization.url,
    logo: organization.logo,
    telephone: organization.telephone,
    sameAs: organization.sameAs
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name: title,
    description
  };

  // Optional product schema
  const productSchema = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image,
        description: product.description,
        sku: product.sku || undefined,
        brand: {
          "@type": "Brand",
          name: product.brand || siteName
        },
        offers: product.price
          ? {
              "@type": "Offer",
              url,
              priceCurrency: product.currency || "INR",
              price: product.price,
              availability: "https://schema.org/InStock"
            }
          : undefined
      }
    : null;

  // Combine all schemas
  const allSchemas = [organizationSchema, websiteSchema];
  if (breadcrumbSchema) allSchemas.push(breadcrumbSchema);
  if (productSchema) allSchemas.push(productSchema);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {allSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
