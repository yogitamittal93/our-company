// ✅ Metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = params; // product slug ✅ no await

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("url", id) // use url as slug
    .single();

  return {
    title: product ? `${product.name} | Lakshmi Iron Company` : "Product Not Found",
    description: product?.description || "Product details not available",
  };
}

// ✅ Product Page
export default async function ProductPage({ params }) {
  const { id } = params; // product slug ✅ no await

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("url", id)
    .single();

  if (error || !product) {
    console.error("Supabase error:", error?.message);
    return <h1 className="text-center text-2xl mt-20">Product Not Found</h1>;
  }

  const whatsappLink = `https://wa.me/917717686970?text=Hello,%20I%20want%20to%20order%20${encodeURIComponent(
    product.name
  )}`;

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-xl"
        />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-4 text-gray-700">{product.description}</p>

        {/* Labels */}
        <div className="flex gap-4 mt-4">
          <span className="font-semibold">Brand: {product.brand}</span>
          {product.ISI && (
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
              ISI Certified
            </span>
          )}
        </div>

        {/* Call & WhatsApp Buttons */}
        <div className="mt-6 flex gap-4">
          <a
            href="tel:+917717686970"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Call Now
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
