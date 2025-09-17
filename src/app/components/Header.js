import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function Header({ breadcrumbs = [] }) {
  let { data: categories } = await supabase
    .from("categories")
    .select("name, url");
  let { data: brands } = await supabase.from("brands").select("name, url");

  categories = categories || [];
  brands = brands || [];

  return (
    <header className="bg-[#1c252e] text-white border-b-[3px_solid_#8d8053] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo2.png"
            alt="Lakshmi Iron Company Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Navbar */}
        <nav className="space-x-6 flex items-center font-medium text-white">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>

          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="hover:text-gray-300 flex items-center gap-1">
              Categories ▾
            </button>
            <div
              className="absolute bg-gray-800 text-white shadow-lg rounded mt-2 w-52 z-50
                opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                transition-opacity duration-200"
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link
                    key={cat.url}
                    href={`/categories/${cat.url}`}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {cat.name}
                  </Link>
                ))
              ) : (
                <span className="block px-4 py-2 text-gray-500">No categories</span>
              )}
            </div>
          </div>

          {/* Brands Dropdown */}
          <div className="relative group">
            <button className="hover:text-gray-300 flex items-center gap-1">
              Shop by Brand ▾
            </button>
            <div
              className="absolute bg-gray-800 text-white shadow-lg rounded mt-2 w-52 z-50
                opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                transition-opacity duration-200"
            >
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <Link
                    key={brand.url}
                    href={`/brands/${brand.url}`}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {brand.name}
                  </Link>
                ))
              ) : (
                <span className="block px-4 py-2 text-gray-500">No brands</span>
              )}
            </div>
          </div>

          <Link
            href="/contact"
            className="hover:text-gray-300 transition bg-[#c4763d] px-3 py-2 rounded"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Breadcrumbs Section */}
      {breadcrumbs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-2 bg-gray-900 text-gray-300 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              <Link href={crumb.href} className="hover:text-white transition">
                {crumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
