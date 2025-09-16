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
  .order("id", { ascending: true }); // Sorted by id


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
    <main className="max-w-6xl mx-auto py-12 px-6">
      {/* Category Title and Description */}
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">
        {category.name}
      </h1>
      <p className="text-center text-gray-700 mb-8">{category.description}</p>

      {/* Subcategories Section */}
      {subcategories.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
            Subcategories
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            {subcategories.map((subcat) => (
              <a
                key={subcat.id}
                href={`/categories/${subcat.url}`}
                className="w-32 text-center border rounded-lg shadow hover:shadow-md transition p-2 bg-white"
              >
                <img
                  src={subcat.image || `/images/${subcat.id}.webp`}
                  alt={subcat.name}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <h3 className="text-sm font-semibold text-blue-600">{subcat.name}</h3>
                <p className="text-xs text-gray-500">{subcat.description?.substring(0, 50)}...</p>
              </a>
            ))}
          </div>
        </section>
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
                src={product.image ? product.image.split(",")[0].trim() : `/images/${product.id}.webp`}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-bold text-xl mb-1 text-blue-700">{product.name}</h3>
            </a>
            <p className="mb-2 text-blue-600">
              {product.description
                ? (product.description.length > 100
                    ? product.description.slice(0, 100) + "..."
                    : product.description)
                : "No description available."}
            </p>
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
        <p className="text-center text-gray-600">No products found</p>
      )}
    </main>
  );
}
