import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function Header({ breadcrumbs = [] }) {
  let { data: categories } = await supabase.from("categories").select("name, url");
  let { data: brands } = await supabase.from("brands").select("name, url");

  categories = categories || [];
  brands = brands || [];

  const splitIntoColumns = (items, columns = 3) => {
    const result = Array.from({ length: columns }, () => []);
    items.forEach((item, index) => {
      result[index % columns].push(item);
    });
    return result;
  };

  const brandColumns = splitIntoColumns(brands, 3);

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

        {/* Hamburger (mobile only) */}
        <div className="md:hidden">
          <input id="menu-toggle" type="checkbox" className="hidden peer" />
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer flex flex-col gap-1"
          >
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </label>

          {/* Mobile Menu */}
          <div className="absolute left-0 top-full w-full bg-[#1c252e] text-white hidden peer-checked:block">
            <nav className="flex flex-col p-4 space-y-2">
              <Link href="/" className="hover:text-gray-300 transition">Home</Link>

              {/* Categories */}
              <details>
                <summary className="cursor-pointer hover:text-gray-300">Categories ▾</summary>
                <ul className="ml-4 mt-1">
                  {categories.map((cat) => (
                    <li key={cat.url}>
                      <Link href={`/categories/${cat.url}`} className="block py-1 hover:text-gray-300">
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              {/* Brands */}
              <details>
                <summary className="cursor-pointer hover:text-gray-300">Shop by Brand ▾</summary>
                <ul className="ml-4 mt-1">
                  {brands.map((brand) => (
                    <li key={brand.url}>
                      <Link href={`/brands/${brand.url}`} className="block py-1 hover:text-gray-300">
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              <Link href="/contact" className="hover:text-gray-300 transition bg-[#c4763d] px-3 py-2">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="space-x-6 hidden md:flex items-center font-medium text-white">
          <Link href="/" className="hover:text-gray-300 transition">Home</Link>

          {/* Categories Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-300 transition">
              <button>Categories ▾</button>
              <div className="absolute top-[42%] left-1/2 -translate-x-1/2 mt-2 w-52 bg-gray-800 text-white rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                <ul>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <li key={cat.url} className="hover:bg-gray-700">
                        <Link href={`/categories/${cat.url}`} className="block px-4 py-2">
                          {cat.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 px-4 py-2">No categories</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Brands Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-300 transition">
              <button>Shop by Brand ▾</button>
              <div className="absolute top-[42%] left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-gray-800 text-white rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                <div className="flex px-4 py-4 gap-4">
                  {brandColumns.map((column, colIndex) => (
                    <ul key={colIndex} className="flex flex-col gap-2">
                      {column.length > 0 ? (
                        column.map((brand) => (
                          <li key={brand.url} className="hover:bg-gray-700 rounded">
                            <Link href={`/brands/${brand.url}`} className="block px-2 py-1">
                              {brand.name}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 px-2 py-1">No brands</li>
                      )}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/contact" className="hover:text-gray-300 transition bg-[#c4763d] px-3 py-2 rounded">
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
