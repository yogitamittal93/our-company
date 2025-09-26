import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import SEO from "@/app/components/SEO";

export const revalidate = 0;

export default async function CategoryPage({ params }) {
  const { url } = await params;

  // Fetch category
  const { data: category } = await supabase
    .from("categories")
    .select("id, name, description, image, subcategory, url")
    .eq("url", url)
    .single();

  if (!category) {
    return <h1 className="text-center text-2xl mt-20">Category not found</h1>;
  }

  // Fetch products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_url", url)
    .order("id", { ascending: true });

  // Fetch subcategories
  let subcategories = [];
  if (category.subcategory) {
    const subcatIds = category.subcategory
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    if (subcatIds.length > 0) {
      const { data: subcatData } = await supabase
        .from("categories")
        .select("id, name, image, url")
        .in("id", subcatIds);
      subcategories = subcatData || [];
    }
  }

  // Breadcrumbs
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: category.name, href: `/categories/${category.url}` },
  ];

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL}${crumb.href}`,
    })),
  };

  // Schema.org Category Page
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description || "Browse our wide range of products.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${category.url}`,
    image: category.image
      ? category.image
      : `${process.env.NEXT_PUBLIC_SITE_URL}/images/${category.id}.webp`,
  };

  // Schema.org Product List
  const productSchema = products?.length
    ? products.map((product) => ({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description:
          product.description?.slice(0, 150) || "No description available.",
        image: product.image
          ? product.image.split(",")[0].trim()
          : `${process.env.NEXT_PUBLIC_SITE_URL}/images/${product.id}.webp`,
        brand: product.brand || "Lakshmi Iron Company",
        offers: {
          "@type": "Offer",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.url}`,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      }))
    : [];

  // Schema.org FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What products are available in ${category.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `In ${category.name}, we offer a wide range of products including ${products
            .map((p) => p.name)
            .slice(0, 5)
            .join(", ")} and more.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you offer custom quotes for ${category.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, you can request a custom quote for any product in ${category.name} directly through WhatsApp by clicking the "Get Quote" button.`,
        },
      },
      {
        "@type": "Question",
        name: `How can I order products from ${category.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can explore products in ${category.name}, view details, and click "Get Quote" to connect with our team on WhatsApp for pricing and availability.`,
        },
      },
    ],
  };

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      {/* SEO Meta */}
      <SEO
        title={`${category.name} | Lakshmi Iron Company`}
        description={category.description || "Browse products and subcategories"}
        url={`/categories/${url}`}
        breadcrumbs={breadcrumbs}
      />

      {/* Canonical URL */}
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_SITE_URL}/categories/${url}`}
      />

      {/* JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      {productSchema.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-3" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={i}>
            <a href={crumb.href} className="hover:text-gray-800 transition">
              {crumb.label}
            </a>
            {i < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
          </span>
        ))}
      </nav>

      {/* Category Title */}
      <h1 className="text-3xl font-bold mb-4 text-center">{category.name}</h1>
      <p className="text-center text-gray-700 mb-10">{category.description}</p>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Explore Subcategories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subcategories.map((subcat) => (
              <a
                key={subcat.id}
                href={`/categories/${subcat.url}`}
                className="relative group overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={subcat.image || `/images/${subcat.id}.webp`}
                    alt={`Explore ${subcat.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2 text-lg font-semibold backdrop-blur-sm">
                  {subcat.name}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      {products?.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">
            View our wide range of Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="shadow hover:shadow-lg transition bg-white flex flex-col"
              >
                <a href={`/products/${product.url}`}>
                  <div className="relative w-full h-48">
                    <Image
                      src={
                        product.image
                          ? product.image.split(",")[0].trim()
                          : `/images/${product.id}.webp`
                      }
                      alt={`${product.name} - Lakshmi Iron Company`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </a>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description
                      ? product.description.length > 80
                        ? product.description.slice(0, 80) + "..."
                        : product.description
                      : "No description available."}
                  </p>
                  <a
                    href={`https://wa.me/917973241912?text=I'm interested in ${encodeURIComponent(
                      product.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-[3px] border-[#8d8053] text-[#8d8053] px-3 py-2 hover:bg-[#8d8053]/10 transition w-fit flex items-center gap-2"
                  >
                    <Image
                      src="/images/whatsapp-icon.jpg"
                      alt="WhatsApp"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    <span className="text-sm font-medium">Get Quote</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-600">No products found</p>
      )}
    </main>
  );
}
