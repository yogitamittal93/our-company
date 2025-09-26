"use client";

import { useState } from "react";
import SEO from "@/app/components/SEO";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ " + data.error);
      }
    } catch (err) {
      setStatus("❌ Something went wrong.");
    }
  };

  // Organization Schema for JSON-LD
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lakshmi Iron Company",
    url: "https://lakshmiironcompany.in",
    logo: "https://lakshmiironcompany.in/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 7717686970",
      contactType: "Customer Service",
      email: "gaurav.mittal.april20@gmail.com",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No. 223, Sector - 29D, Iron Market",
      addressLocality: "Chandigarh",
      postalCode: "160020",
      addressCountry: "IN",
    },
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 text-[#1c252e] min-h-screen">
      <SEO
        title="Contact Lakshmi Iron Company | Chandigarh Iron Market"
        description="Get in touch with Lakshmi Iron Company, trusted supplier of iron and building materials in Chandigarh. Contact us via phone, email, or our form."
        url="/contact"
      />

      {/* Inject Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Address & Map Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Address</h2>
          <p>
            Shop No. 223, Sector - 29D,<br />
            Iron Market, Chandigarh
          </p>
          <p>Phone: +91 7717686970</p>
          <p>Email: gaurav.mittal.april20@gmail.com</p>

          <div className="mt-6 h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.332385222566!2d76.78229897525341!3d30.709054874595694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed1d8bc09b11%3A0x8c4654b9a9d3057c!2sLAKSHMI%20IRON%20COMPANY!5e0!3m2!1sen!2sin!4v1758178034783!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Section */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-[#1c252e] text-white p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border border-gray-600 bg-[#1c252e] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d8053]"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-600 bg-[#1c252e] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d8053]"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message..."
            rows="4"
            required
            className="w-full border border-gray-600 bg-[#1c252e] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d8053]"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#8d8053] text-white py-3 font-semibold hover:bg-[#7a6f47] transition"
          >
            Send Message
          </button>

          {status && <p className="text-sm text-center mt-2">{status}</p>}
        </form>
      </div>
    </main>
  );
}
