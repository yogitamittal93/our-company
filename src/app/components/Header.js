// src/app/components/Header.js
import { supabase } from "@/lib/supabaseClient";
import HeaderClient from "./HeaderClient";

export default async function Header({ breadcrumbs = [] }) {
  let { data: categories } = await supabase.from("categories").select("name, url");
  let { data: brands } = await supabase.from("brands").select("name, url");

  return (
    <HeaderClient
      categories={categories || []}
      brands={brands || []}
      breadcrumbs={breadcrumbs}
    />
  );
}
