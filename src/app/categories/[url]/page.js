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
        .select("id, name, image, url")
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
      {/* Category Title */}
      <h1 className="text-3xl font-bold mb-4 text-center text-black-800">
        {category.name}
      </h1>
      <p className="text-center text-gray-700 mb-8">{category.description}</p>

      {/* Subcategories Section with big images and name labels */}
      {subcategories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-center text-black-700">
            Explore Subcategories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subcategories.map((subcat) => (
              <a
                key={subcat.id}
                href={`/categories/${subcat.url}`}
                className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={subcat.image || `/images/${subcat.id}.webp`}
                  alt={subcat.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2 text-lg font-semibold backdrop-blur-sm">
              {subcat.name}
            </div>
                
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Products Section with quote buttons */}
      {products && products.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center text-black-800">
           View our wide range of Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="shadow hover:shadow-lg transition bg-white flex flex-col">
                 <a href={`/products/${product.url}`}>
                <img
                  src={product.image ? product.image.split(",")[0].trim() : `/images/${product.id}.webp`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                /></a>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <h3 className="font-bold text-lg text-black-600 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description
                      ? (product.description.length > 80
                          ? product.description.slice(0, 80) + "..."
                          : product.description)
                      : "No description available."}
                  </p>
                  <a
                  href={`https://wa.me/917973241912?text=I'm interested in ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[3px] border-[#8d8053] text-[#8d8053] px-3 py-2 rounded hover:bg-[#8d8053]/10 transition w-fit flex items-center gap-2"
                >
                  <img src="/images/whatsapp-icon.jpg" alt="WhatsApp" className="w-5 h-5" />
                  <span className="text-sm font-medium">Get Quote</span>
                </a>

                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-600">No products found</p>
      )}
    </main>
  );
}
