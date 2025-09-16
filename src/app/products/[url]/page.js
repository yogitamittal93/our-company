import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import ProductContent from "./ProductContent"; // Import client component
import RecentlyViewed from "@/app/components/RecentlyViewed";

export const revalidate = 0; // always fresh

export async function generateMetadata({ params }) {
  const { url } = params;
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
    .eq("url", url)
    .single();

  if (error || !product) return notFound();

 let related = [];
  if (product.brand_id) {
    const { data } = await supabase
      .from("products")
      .select("id, name, url, image")
      .eq("brand_id", product.brand_id)  // single brand id, so use eq
      .neq("id", product.id)             // exclude current product
      .limit(10);

    related = data || [];
  }



  const whatsappLink = `https://wa.me/917717686970?text=Hello,%20I%20want%20to%20order%20${encodeURIComponent(product.name)}`;

  return (
    <ProductContent
      product={product}
      related={related}
      whatsappLink={whatsappLink}
    />
  );
}
