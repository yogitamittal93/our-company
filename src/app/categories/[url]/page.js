import { supabase } from "@/lib/supabaseClient";

export const revalidate = 0; // always fresh

export default async function CategoryPage({ params }) {
  const { url } = await params;

  // Fetch the main category by URL
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, name, description, image, subcategory")
    .eq("url", url)
    .single();

  if (categoryError || !category) {
    console.error("Category fetch error:", categoryError?.message);
    return <h1 className="text-center text-2xl mt-20">Category not found</h1>;
  }

  // Fetch products where category_url matches
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category_url", url)
    .order("id", { ascending: true });

  if (productsError) {
    console.error("Products fetch error:", productsError?.message);
  }

  // Fetch subcategories if subcategory column has values
  let subcategories = [];
  if (category.subcategory) {
    const subcatIds = category.subcategory
      .split(",")
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id));

    if (subcatIds.length > 0) {
      const { data: subcatData, error: subcatError } = await supabase
        .from("categories")
        .select("id, name, description, image, url")
        .in("id", subcatIds);

      if (subcatError) {
        console.error("Subcategories fetch error:", subcatError.message);
      } else {
        subcategories = subcatData;
      }
    }
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-6 bg-gray-50 min-h-screen">
      {/* Category Title and Description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{category.name}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
      </div>

      {/* Subcategories Section */}
      {subcategories.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
            Explore Subcategories
          </h2>
          <div className="flex justify-center flex-wrap gap-6">
            {subcategories.map((subcat) => (
              <a
                key={subcat.id}
                href={`/categories/${subcat.url}`}
                className="w-48 border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 text-center"
              >
                <img
                  src={subcat.image || `/images/${subcat.id}.webp`}
                  alt={subcat.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">{subcat.name}</h3>
                <p className="text-sm text-gray-500">
                  {subcat.description?.substring(0, 60)}...
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Products
        </h2>
        {products && products.length > 0 ? (
          <ul className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <li
                key={product.id}
                className="border rounded-lg shadow-sm bg-white hover:shadow-md transition"
              >
                <a href={`/products/${product.url}`} className="block">
                  <img
                    src={product.image ? product.image.split(",")[0].trim() : `/images/${product.id}.webp`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {product.description
                        ? (product.description.length > 100
                            ? product.description.slice(0, 100) + "..."
                            : product.description)
                        : "No description available."}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{product.brand}</span>
                      {product.ISI && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          ISI Certified
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </section>
    </main>
  );
}
