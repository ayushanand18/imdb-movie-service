import React from "react";
import "./Body.css";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-xl font-bold cursor-pointer">
              <img
                className="header_logo"
                src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media/netflix.svg"
              />
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">MOVIES SAVED</span>
          </div>
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">CHARTS</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
