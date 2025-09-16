import { supabase } from "../lib/supabaseClient.js";
import Image from 'next/image';
import ProductImageSlider from "./components/productImageSlider.js";

export const metadata = {
  title: "Lakshmi Iron Company | TATA DURASHINE & BUILDING MATERIALS Supplier in Chandigarh",
  description:
    "Authorised dealer & supplier of TATA DURASHINE, Jindal color coated, ACP Sheets, Apollo pipes, Ankur asbestos, fibre, polycarbonate in Loha (iron) market, chandigarh"
};

export default async function HomePage() {
  // Fetch featured products from Supabase
  const { data: featuredProducts, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("feature_homepage", true);

  if (productsError) {
    console.error("Supabase error fetching products:", productsError.message);
  }

  // Fetch featured categories from Supabase
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .eq("featuredHome", true);

  if (categoriesError) {
    console.error("Supabase error fetching categories:", categoriesError.message);
  }

  return (
    <main className="p-8 max-w-6xl mx-auto ">
      <section className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <a href={`/categories/tata-durashine-roofing-sheets`}>
          <img
            src="/images/banner1109.jpg"
            alt="Lakshmi Iron Products"
            className="w-full h-80 rounded-xl shadow-2xl"
          />
          </a>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-blue-800">
          Trusted Wholesale Supplier of premium quality<br />Iron products in Chandigarh
        </h1>

        <p className="text-lg mb-6 text-blue-700">
          Since 1993, delivering premium products such as Color coated sheets of reputed brands like TATA & Jindal, Galvanized corrugated sheets, GP sheets, CR sheets, Chequered sheets, ACP Sheets by ALUCOM, MS ANGLE, Channel, MS PIPE of brands like APOLLO, Bhushan, Jyoti, Square bar, MS Round, MS Flat, barbed wire, concertina wire, weldmesh zali, self drilling screws by HP etc. We possess huge variety of Fibre as well as polycarbonate sheets at wholesale prices.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="tel:+917973241912"
            className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800/90 transition shadow-md"
          >
            📞 Call Now
          </a>
          <a
            href="https://wa.me/917973241912"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md"
          >
            💬 Order on WhatsApp
          </a>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">
          Shop by Category
        </h2>
        <ul className="grid md:grid-cols-3 gap-6">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <li
                key={category.id}
                className="border-gray-400 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <a href={`/categories/${category.url}`}>
                  <img
                    src={category.image || `/images/${category.url}.jpg`}
                    alt={category.name}
                    className="w-full h-90"
                  />
                  <h3 className="font-bold text-xl p-4 text-center text-blue-700">
                    {category.name}
                  </h3>
                </a>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No featured categories available.</p>
          )}
        </ul>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
          Featured Products
        </h2>
        {(!featuredProducts || featuredProducts.length === 0) ? (
          <p className="text-center text-gray-600">No featured products available right now.</p>
        ) : (
          <ul className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <li
                key={product.url}
                className="border-gray-400 rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                <a href={`/products/${product.url}`}>
                  <ProductImageSlider
                    image={product.image}
                    id={product.id}
                    name={product.name}
                  />
                  <h3 className="font-bold text-xl mb-1 text-blue-700">{product.name}</h3>
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
        )}
      </section>

      {/* The rest of your page sections remain unchanged */}
    </main>
  );
}
