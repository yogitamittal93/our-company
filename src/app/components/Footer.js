export default function Footer() {
  return (
    <footer className="bg-gray-300 text-blue-700 pt-6">
      <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Lakshmi Iron Company. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          📞 079732 41912 / 7717686970 | 📧 info@ironbusiness.com
        </p>
      </div>
    </footer>
  );
}
