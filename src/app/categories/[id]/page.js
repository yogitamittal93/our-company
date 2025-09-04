// src/app/categories/[id]/page.js
import { supabase } from "../../../lib/supabaseClient";

export const revalidate = 0; // optional: always fetch fresh

export default async function CategoryPage({ params }) {
  const { id } = params; // ✅ category slug (e.g. "gp-sheets")

  // fetch products where category_url matches slug
  const { data: categoryProducts, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_url", id);

  if (error) {
    console.error("Supabase error:", error.message);
    return <h1 className="text-center text-2xl mt-20">Error loading products</h1>;
  }

  if (!categoryProducts || categoryProducts.length === 0) {
    return <h1 className="text-center text-2xl mt-20">No Products Found</h1>;
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {id.replace(/-/g, " ")}
      </h1>

      <ul className="grid md:grid-cols-3 gap-6">
        {categoryProducts.map((product) => (
          <li
            key={product.url}
            className="border rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <a href={`/products/${product.url}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-bold text-xl mb-1">{product.name}</h3>
            </a>
            <p className="mb-2">{product.description}</p>
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

