// src/app/sitemap.js
import { createClient } from "@supabase/supabase-js";

export default async function sitemap() {
  const baseUrl = "https://lakshmiironcompany.in";
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  // Fetch categories
  const { data: categories } = await supabase.from("categories").select("url");

  // Fetch products
  const { data: products } = await supabase.from("products").select("id");

  const safeDate = (date) => {
    const now = new Date();
    const d = date ? new Date(date) : now;
    return d > now ? now : d;
  };

  let routes = [
    { url: `${baseUrl}/`, lastModified: safeDate() },
    { url: `${baseUrl}/contact`, lastModified: safeDate() },
  ];

  if (categories) {
    routes = routes.concat(
      categories.map((c) => ({
        url: `${baseUrl}/category/${c.url}`,
        lastModified: safeDate(c.updated_at),
      }))
    );
  }

  if (products) {
    routes = routes.concat(
      products.map((p) => ({
        url: `${baseUrl}/product/${p.id}`,
        lastModified: safeDate(p.updated_at),
      }))
    );
  }

  return routes;
}
