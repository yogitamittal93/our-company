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

  let routes = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  if (categories) {
    routes = routes.concat(
      categories.map((c) => ({
        url: `${baseUrl}/category/${c.url}`,
        lastModified: new Date(),
      }))
    );
  }

  if (products) {
    routes = routes.concat(
      products.map((p) => ({
        url: `${baseUrl}/product/${p.id}`,
        lastModified: new Date(),
      }))
    );
  }

  return routes;
}
