import { supabase } from "@/lib/supabaseClient";

export const revalidate = 0; // always fetch fresh

export default async function BrandPage({ params }) {
  const { url } = await params;

  // Fetch brand details from "brands" table by URL
  const { data: brand, error: brandError } = await supabase
    .from("brands")
    .select("id, name, url, description, image")
    .eq("url", url)
    .single();

  if (brandError || !brand) {
    console.error("Brand fetch error:", brandError?.message);
    return <h1 className="text-center text-2xl mt-20">Brand not found</h1>;
  }

  // Fetch products where brand_url contains this brand's URL
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .ilike("brand_url", `%${url}%`); // case insensitive partial match

  if (productsError) {
    console.error("Products fetch error:", productsError.message);
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      {/* Brand Title and Description */}
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">
        {brand.name}
      </h1>
      {brand.description && (
        <p className="text-center text-gray-700 mb-8">{brand.description}</p>
      )}

      {/* Products Section */}
      {products && products.length > 0 ? (
        <ul className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <li
              key={product.id}
              className="border rounded-lg shadow p-4 hover:shadow-lg transition bg-white"
            >
              <a href={`/products/${product.url}`}>
                <img
                  src={
                    product.image
                      ? product.image.split(",")[0].trim()
                      : `/images/${product.id}.webp`
                  }
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="font-bold text-xl mb-1 text-blue-700">
                  {product.name}
                </h3>
              </a>
              <p className="mb-2 text-blue-600">{product.description}</p>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{product.brand}</span>
                {product.ISI && (
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
                    ISI Certified
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No products found for this brand</p>
      )}
    </main>
  );
}
