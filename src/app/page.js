import { supabase } from "../lib/supabaseClient.js";
import Image from 'next/image';
import ProductImageSlider from "./components/productImageSlider.js";
import BrandBar from "./components/BrandBar"; 
import ReviewSlider from "./components/ReviewSlider";

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

  const { data: brands, error: brandsError } = await supabase
  .from("brands")
  .select("*");

if (brandsError) {
  console.error("Supabase error fetching brands:", brandsError.message);
}

  return (
    <main className="w-full">
      <section className="text-center mb-0 w-full bg-[#030a1c]">
  <div
    className="w-full"
    style={{
      background: `
        radial-gradient(at top left, #030a1c 0%, transparent 30%),
        radial-gradient(at top right, #875640 0%, transparent 50%),
        radial-gradient(at bottom left, #111823 0%, transparent 70%),
        radial-gradient(at bottom right, #111823 0%, transparent 50%)`,
      backgroundBlendMode: 'overlay',
    }}
  >
    <div className="flex justify-center bg-transparent">
      <a href={`/categories/tata-durashine-roofing-sheets`}>
        <img
          src="/images/bannerHome.png"
          alt="Lakshmi Iron Products"
          className="w-full h-auto"
        />
      </a>
    </div>
  </div>
</section>
 <BrandBar brands={brands || []} />
<section className="text-left mb-12 max-w-6xl mx-auto mt-6 ">
  <h1 className="text-3xl font-bold mb-4 text-black-800">
    Trusted Wholesale Supplier of premium quality Iron products in Chandigarh
  </h1>

 <div className="max-w-6xl mx-auto text-gray-700 text-lg mb-6">
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 list-none">
    <li className="flex items-start gap-2">
      <span className="text-green-600">✔</span>
      Color coated sheets of reputed brands like  TATA & Jindal 
    </li>
    
    <li className="flex items-start gap-2">
      <span className="text-green-600">✔</span>
      ACP Sheets by ALUCOM
    </li>
    <li className="flex items-start gap-2">
      <span className="text-green-600">✔</span>
      MS ANGLE, Channel, PIPE of brands like APOLLO, Bhushan, Jyoti
    </li>
    <li className="flex items-start gap-2">
      <span className="text-green-600">✔</span>
      Square bar, MS Round, MS Flat
    </li>
    
    <li className="flex items-start gap-2">
      <span className="text-green-600">✔</span>
      Self drilling screws by HP etc
    </li>
    <li className="flex items-start gap-2">
      <span className="text-green-600">✔</span>
      Barbed wire, concertina wire, weldmesh zali
    </li>
    <li className="flex items-start gap-2">
      <span className="text-green-600">✔</span>
      Galvanized corrugated sheets, GP sheets, CR sheets, Chequered sheets
    </li>
    
    <li className="flex items-start gap-2">
      <span className="text-green-600">✔</span>
      Huge variety of Fibre as well as polycarbonate sheets<br/>at wholesale prices
    </li>
  </ul>
</div>


  <div className="flex gap-4 justify-center">
    <a
      href="tel:+917973241912"
      className="bg-[#da952e] text-white px-6 py-3 rounded-lg hover:bg-[#da952e] transition shadow-md"
    >
      📞 Call Now
    </a>
    <a
      href="https://wa.me/917973241912"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#da952e] text-white px-6 py-3 rounded-lg hover:bg-[#da952e] transition shadow-md"
    >
      💬 Get a Quote on WhatsApp
    </a>
  </div>
</section>


      {/* Categories Section */}
      <section className="mb-12 max-w-6xl mx-auto">
  <h2 className="text-3xl font-semibold mb-6 text-left text-black-800">
    Shop by Category
  </h2>
  <ul className="grid md:grid-cols-3 gap-6">
    {categories && categories.length > 0 ? (
      categories.map((category) => (
        <li
          key={category.id}
          className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition group"
        >
          <a href={`/categories/${category.url}`} className="block relative">
            <img
              src={category.image || `/images/${category.url}.jpg`}
              alt={category.name}
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2 text-lg font-semibold backdrop-blur-sm">
              {category.name}
            </div>
          </a>
          {/* Optional: Add description below image */}
          <p className="text-center text-gray-600 mt-2 px-2">
            Explore premium products in {category.name}
          </p>
        </li>
      ))
    ) : (
      <p className="text-center text-gray-600">No featured categories available.</p>
    )}
  </ul>
</section>
   <ReviewSlider />

      {/* Featured Products Section */}
      <section className="mb-12 max-w-6xl mx-auto ">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black-800">
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
                  <h3 className="font-bold text-xl mb-1 text-black-600">{product.name}</h3>
                </a>
                <p className="mb-2">{product.description
                      ? (product.description.length > 80
                          ? product.description.slice(0, 80) + "..."
                          : product.description)
                      : "No description available."}</p>
                
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
