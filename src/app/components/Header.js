// src/app/components/Header.js
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function Header() {
  let { data: categories } = await supabase
    .from("categories")
    .select("name, url");
  let { data: brands } = await supabase.from("brands").select("name, url");

  categories = categories || [];
  brands = brands || [];

  return (
    <header className="bg-gray-300 text-blue-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Lakshmi Iron Company Logo"
            className="h-20 w-auto"
          />
          {/*<span className="text-l font-bold tracking-wide hover:text-brand-blue transition">
            Lakshmi Iron Company
          </span>*/}
        </Link>

        {/* Navbar */}
        <nav className="space-x-6 flex items-center font-medium">
          <Link href="/" className="hover:text-brand-blue transition">
            Home
          </Link>

          {/* Categories */}
          {/* Categories */}
          <div className="relative group">
            <button className="hover:text-brand-blue flex items-center gap-1">
              Categories ▾
            </button>
            <div
              className="absolute bg-gray-200 text-blue-700 shadow-lg rounded mt-2 w-52 z-50
                opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                transition-opacity duration-200"
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link
                    key={cat.url}
                    href={`/categories/${cat.url}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {cat.name}
                  </Link>
                ))
              ) : (
                <span className="block px-4 py-2 text-gray-500">No categories</span>
              )}
            </div>
          </div>

          {/* Brands */}
          <div className="relative group">
            <button className="hover:text-brand-blue flex items-center gap-1">
              Shop by Brand ▾
            </button>
            <div
              className="absolute bg-gray-200 text-blue-700 shadow-lg rounded mt-2 w-52 z-50
                opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                transition-opacity duration-200"
            >
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <Link
                    key={brand.url}
                    href={`/brands/${brand.url}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {brand.name}
                  </Link>
                ))
              ) : (
                <span className="block px-4 py-2 text-gray-500">No brands</span>
              )}
            </div>
          </div>


          <Link href="/contact" className="hover:text-brand-blue transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
