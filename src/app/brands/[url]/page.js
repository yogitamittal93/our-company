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
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center text-black-800">
            Products
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
