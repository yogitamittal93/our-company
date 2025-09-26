import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import SEO from "@/app/components/SEO";

export const revalidate = 0; // always fetch fresh

export default async function BrandPage({ params }) {
  const { url } = params;

  // ✅ Fetch brand details
  const { data: brand, error: brandError } = await supabase
    .from("brands")
    .select("id, name, url, description, image")
    .eq("url", url)
    .single();

  if (brandError || !brand) {
    console.error("Brand fetch error:", brandError?.message);
    return <h1 className="text-center text-2xl mt-20">Brand not found</h1>;
  }

  // ✅ Fetch products for brand
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, url, description, image")
    .ilike("brand_url", `%${url}%`);

  if (productsError) {
    console.error("Products fetch error:", productsError.message);
  }

  // Breadcrumbs
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: brand.name, href: `/brands/${brand.url}` },
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

  // Schema.org Product
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
        brand: brand.name,
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
        name: `What products are available from ${brand.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: products?.length
            ? products.map((p) => p.name).join(", ")
            : "Currently, no products are available from this brand.",
        },
      },
      {
        "@type": "Question",
        name: `Where can I buy ${brand.name} products?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can contact us via WhatsApp or phone to buy ${brand.name} products.`,
        },
      },
    ],
  };

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      {/* SEO */}
      <SEO
        title={`${brand.name} | Lakshmi Iron Company`}
        description={brand.description || `Explore products by ${brand.name}`}
        url={`/brands/${url}`}
      />

      {/* Canonical */}
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_SITE_URL}/brands/${url}`}
      />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
      <nav className="text-sm text-gray-600 mb-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-gray-800">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{brand.name}</span>
      </nav>

      {/* Brand Hero */}
      {brand.image && (
        <div className="relative w-full h-64 mx-auto mb-6">
          <Image
            src={brand.image}
            alt={brand.name}
            width={800}
            height={400}
            className="object-cover "
            priority = {true}
          />
        </div>
      )}

      {/* Brand Title & Description */}
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">
        {brand.name}
      </h1>
      {brand.description && (
        <p className="text-center text-gray-700 mb-8">{brand.description}</p>
      )}

      {/* Products Section */}
      {products && products.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-left text-gray-800">
            Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const productImage = product.image
                ? product.image.split(",")[0].trim()
                : `/images/${product.id}.webp`;

              return (
                <div
                  key={product.id}
                  className="shadow hover:shadow-lg transition bg-white flex flex-col overflow-hidden"
                >
                  <Link href={`/products/${product.url}`}>
                    <div className="relative w-full h-48">
                      <Image
                        src={productImage}
                        alt={`${product.name} - ${brand.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        priority={index === 0} // LCP improvement
                      />
                    </div>
                  </Link>

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

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/917973241912?text=I'm interested in ${encodeURIComponent(
                        product.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-[2px] border-[#8d8053] text-[#8d8053] px-3 py-2 hover:bg-[#8d8053]/10 transition w-fit flex items-center gap-2"
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
              );
            })}
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-600">No products found</p>
      )}
    </main>
  );
}
