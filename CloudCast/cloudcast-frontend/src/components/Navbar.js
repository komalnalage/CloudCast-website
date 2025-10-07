export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-semibold tracking-wide">🎧 CloudCast</h1>
        <div className="space-x-6">
          <a href="#music" className="hover:text-gray-300 transition">Music</a>
          <a href="#podcasts" className="hover:text-gray-300 transition">Podcasts</a>
        </div>
      </div>
    </nav>
  );
}
