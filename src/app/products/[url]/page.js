import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import RecentlyViewed from "@/app/components/RecentlyViewed";

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
  const { url } =  await params;

  // Product with brand & category relations
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

  // Related products from same brand (server-side)
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

  const whatsappLink = `https://wa.me/917717686970?text=Hello,%20I%20want%20to%20order%20${encodeURIComponent(
    product.name
  )}`;

  return (
    <main className="max-w-4xl mx-auto py-12 px-6 bg-gray-100 min-h-screen">
      <div className="bg-gray-50 rounded-2xl shadow-lg p-6">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />

        {/* Product Title */}
        <h1 className="mt-6 text-3xl font-bold text-gray-800">{product.name}</h1>

        {/* Description */}
        <p className="mt-4 text-gray-700">{product.description}</p>

        <div className="flex flex-col gap-2 mt-4 text-gray-700">
      <span className="font-semibold">
        Brand: {product.brand || "Not specified"}
      </span>

      {product.brands && (
        <a
          href={`/brands/${product.brands.url}`}
          className="text-brand-blue hover:underline"
        >
          More from {product.brands.name} →
        </a>
      )}

      {product.ISI && (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded w-fit text-sm font-medium">
          ✅ ISI Certified
        </span>
      )}
    </div>

    {/* Call & WhatsApp Buttons */}
    <div className="mt-6 flex gap-4">
      <a
        href="tel:+917717686970"
        className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800/90 transition shadow-md"
      >
        Call Now
      </a>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
      >
        Order via WhatsApp
      </a>
    </div>
  </div>

  {/* Related products (server-fetched) */}
  {related.length > 0 && (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">More from this brand</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {related.map((rp) => (
          <a
            key={rp.id}
            href={`/products/${rp.url}`}
            className="min-w-[200px] border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-white"
          >
            <img
              src={rp.image}
              alt={rp.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <h3 className="font-semibold text-sm text-gray-700">{rp.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  )}

  {/* Recently viewed */}
  <RecentlyViewed current={{ id: product.id, name: product.name, url: product.url, image: product.image }} />
</main>
  );
}
