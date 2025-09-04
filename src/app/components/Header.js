import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">Lakshmi Iron Company</h1>
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-green-400">Home</Link>
          <Link href="/categories" className="hover:text-green-400">Categories</Link>
          <Link href="/contact" className="hover:text-green-400">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
