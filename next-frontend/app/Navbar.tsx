import React from "react";
import "./Body.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-red-600 text-xl font-extrabold cursor-pointer">
              <Link href="/">IMDB MOVIE SEARCH</Link>
            </span>
          </div>
          <div className="flex items-center">
            <Link href="/search">
              <span className="text-white text-xl font-bold">SEARCH MOVIES</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/gender">
              <span className="text-white text-xl font-bold">GENDER TRENDS</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/charts">
              <span className="text-white text-xl font-bold">CHARTS</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
