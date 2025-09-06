import { supabase } from "@/lib/supabaseClient";

export const revalidate = 0; // always fetch fresh

export default async function BrandPage({ params }) {
  const { url } = params; // ✅ category slug (e.g. "gp-sheets")

  // fetch products where category_url matches slug
  const { data: brandProducts, error } = await supabase
    .from("products")
    .select("*")
    .eq("brand_url", url);

  if (error) {
    console.error("Supabase error:", error.message);
    return <h1 className="text-center text-2xl mt-20">Error loading products</h1>;
  }

  if (!brandProducts || brandProducts.length === 0) {
    return <h1 className="text-center text-2xl mt-20">No Products Found</h1>;
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        {url.replace(/-/g, " ")}
      </h1>

      <ul className="grid md:grid-cols-3 gap-6">
        {brandProducts.map((product) => (
          <li
            key={product.url}
            className="border-blue-400 rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <a href={`/products/${product.url}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-bold text-xl mb-1 text-blue-700">{product.name}</h3>
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
    </main>
  );
}
