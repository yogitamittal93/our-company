import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import ProductContent from "./ProductContent"; // client component
import Script from "next/script";

export const revalidate = 0; // always fresh
export async function generateMetadata({ params }) {
  const { url } = await params;
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("url", url)
    .single();

  return {
    title: product ? `${product.name} | Lakshmi Iron Company` : "Product Not Found",
    description: product?.description || "Product details not available",
  };
}

export default async function ProductPage({ params }) {
  const { url } = params;

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      url,
      image,
      description,
      brand,
      ISI,
      brand_id,
      categories ( id, name, url ),
      brands ( id, name, url )
    `)
    .ilike("url", url)
    .maybeSingle();

  if (!product || error) return notFound();

  let related = [];
  if (product.brand_id) {
    const { data } = await supabase
      .from("products")
      .select("id, name, url, image")
      .eq("brand_id", product.brand_id)
      .neq("id", product.id)
      .limit(10);
    related = data || [];
  }

  const whatsappLink = `https://wa.me/917717686970?text=Hello,%20I%20want%20to%20order%20${encodeURIComponent(product.name)}`;

  const imageUrl = product.image ? product.image.split(",")[0].trim() : `/images/${product.id}.webp`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: imageUrl,
    sku: product.id,
    brand: { "@type": "Brand", name: product.brand },
    category: product.categories?.name || "Products",
    offers: product.price && {
      "@type": "Offer",
      url: `https://lakshmiironcompany.in/products/${product.url}`,
      price: product.price,
      priceCurrency: product.currency || "INR",
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lakshmiironcompany.in/" },
      ...(product.categories
        ? [{ "@type": "ListItem", position: 2, name: product.categories.name, item: `https://lakshmiironcompany.in/categories/${product.categories.url}` }]
        : []),
      { "@type": "ListItem", position: product.categories ? 3 : 2, name: product.name, item: `https://lakshmiironcompany.in/products/${product.url}` },
    ],
  };

  return (
    <>
      <ProductContent product={product} related={related} whatsappLink={whatsappLink} />

      <Script
        id="product-breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumbSchema]) }}
      />
    </>
  );
}
