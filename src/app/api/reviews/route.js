import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_KEY // server-only
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, rating, author_name, text, created_at")
      .order("id", { ascending: true });

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
