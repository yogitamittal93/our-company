// src/app/layout.js
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Lakshmi Iron Company",
  description: "Iron & Steel Sheets Supplier in Chandigarh",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-brand-dark text-white">
        <Header />

        {/* Main content wrapper */}
        <main className="flex-grow bg-gray-100 text-black pb-6">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
