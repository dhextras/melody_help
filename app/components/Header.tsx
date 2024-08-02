import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/image.png"
            alt="MoodTunes Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold">MoodTunes</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-black font-semibold hover:bg-gray-300 border rounded-md p-2 bg-white ">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
