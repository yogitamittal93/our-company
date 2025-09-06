// src/app/page.js
import { supabase } from "../lib/supabaseClient.js";
import Image from 'next/image'

export const metadata = {
  title: "Lakshmi Iron Company | Iron & Steel Sheets Supplier in Chandigarh",
  description:
    "Lakshmi Iron Company, located in Sector-29D, Chandigarh, supplies GC Sheets, GP Sheets, CR Sheets & Iron products. Trusted distributor since 2011 with bulk supply and quality assurance.",
};

export default async function HomePage() {
  // Fetch featured products from Supabase (flag = true)
  const { data: featuredProducts, error } = await supabase
    .from("products")
    .select("*")
    .eq("feature_homepage", true);

  if (error) {
    console.error("Supabase error:", error.message);
  }

  return (
    
    <main className="p-8 max-w-6xl mx-auto ">
      <section className="text-center mb-12">
  <div className="flex justify-center mb-6">
    <img
      src="/images/banner.png"
      alt="Lakshmi Iron Products"
      className="w-full max-w-3xl rounded-xl shadow-2xl"
    />
  </div>

  <h1 className="text-4xl font-bold mb-4 text-blue-800">
    Trusted Supplier of Iron & Steel Sheets in Chandigarh
  </h1>
  
  <p className="text-lg mb-6 text-blue-700">
    Since 1993, delivering premium GC, GP, CR, and Iron Sheets for
    construction and industry.
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
      {/* Hero Section 
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Trusted Supplier of Iron & Steel Sheets in Chandigarh
        </h1>
        
        <p className="text-lg mb-6">
          Since 1993, delivering premium GC, GP, CR, and Iron Sheets for
          construction and industry.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="tel:+917973241912"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            📞 Call Now
          </a>
          <a
            href="https://wa.me/917973241912"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            💬 Order on WhatsApp
          </a>
        </div>
      </section>
    <div className="lg:w-1/2 flex justify-center">
      <img src="/images/banner.png" alt="Lakshmi Iron Products" className="w-full max-w-md rounded-xl shadow-2xl" />
    </div>*/}
      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
          Shop by Category
        </h2>
        <ul className="grid md:grid-cols-3 gap-6">
          {/* In future, fetch categories from Supabase */}
          <li className="border-gray-400 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <a href="/categories/roofing-sheets">
              <img
                src="/images/banner.png" 
                alt="Roofing Sheets"
                className="w-full h-40 object-cover"
              />
              <h3 className="font-bold text-xl p-4 text-center text-blue-700">
                Roofing Sheets
              </h3>
            </a>
          </li>
          <li className="border-gray-400 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <a href="/categories/gp-sheets">
              <img
                src="/images/banner.png" 
                alt="GP Sheets"
                className="w-full h-40 object-cover"
              />
              <h3 className="font-bold text-xl p-4 text-center text-blue-700">GP Sheets</h3>
            </a>
          </li>
          <li className="border-gray-400 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <a href="/categories/cr-sheets">
              <img
                src="/images/banner.png" 
                alt="CR Sheets"
                className="w-full h-40 object-cover"
              />
              <h3 className="font-bold text-xl p-4 text-center text-blue-700">CR Sheets</h3>
            </a>
          </li>
        </ul>
      </section>

   

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
            <img
              src="/images/dummy.webp" /*{product.image}*/
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
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

      {/* Why Choose Us */}
      <section className="mb-12 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Why Choose Us?</h2>
        <p className="mb-2 text-blue-600">🏢 Strategic Location – Sector 29D Iron Market</p>
        <p className="mb-2 text-blue-600">
          🛠️ Wide Product Range – GC, GP, CR, Laminated Sheets & more
        </p>
        <p className="mb-2 text-blue-600">
          📦 Bulk Supply & Wholesale Rates – Perfect for contractors & industry
        </p>
        <p className="mb-2 text-blue-600">
          ✅ Quality Assurance – Products meeting IS, ASTM & global standards
        </p>
        <p className="mb-2 text-blue-600">
          🤝 Over a Decade of Trust – Serving since 2011 with integrity
        </p>
      </section>

      {/* Contact Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center  text-blue-600">Find Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-lg text-blue-600">
            <p>
              <strong>Lakshmi Iron Company</strong>
            </p>
            <p>No-223, Iron Market, Sector-29D, Chandigarh, 160030</p>
            <p>📞 079732 41912 / 7717686970</p>
            <p>📧 gaurav.mittal.april20@gmail.com</p>
            <p>🆔 GSTIN: 04AFJPM4043F1ZR</p>
          </div>

          <iframe
            src="https://share.google/qAx5tVAb1WdAw0Pm7"
            width="400"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
