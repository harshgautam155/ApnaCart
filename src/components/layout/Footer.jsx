export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} apnaCart. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}