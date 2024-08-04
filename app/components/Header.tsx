import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/image.png" alt="MoodTunes Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">MoodTunes</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="rounded-md border bg-white p-2 font-semibold text-black hover:bg-gray-300"
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
