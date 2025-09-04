// src/app/supabase-test/page.js
import { supabase } from "../../lib/supabaseClient";

export default async function SupabaseTestPage() {
  // Fetch all rows from products table
  const { data, error } = await supabase.from("products").select("*");

  console.log("Fetched products:", data);
  console.error("Supabase error:", error);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🔎 Supabase Test Page
      </h1>

      {error && (
        <p className="text-red-600 text-center">
          Error: {error.message}
        </p>
      )}

      {!data || data.length === 0 ? (
        <p className="text-center text-gray-600">
          No products found in Supabase.
        </p>
      ) : (
        <ul className="grid gap-4">
          {data.map((p) => (
            <li key={p.id} className="border rounded p-4 shadow">
              <h2 className="font-bold text-lg">{p.name}</h2>
              <p>{p.description}</p>
              <p className="text-sm text-gray-500">URL slug: {p.url}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
