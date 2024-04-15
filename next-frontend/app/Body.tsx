import React from "react";
import Link from "next/link";

const Body: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-screen body">
      <h1 className="text-[5em] leading-[1.2em] shadow-xl backdrop-blur p-4 font-extrabold my-12 mt-40 text-white">
        Welcome To Our <br />
        <span className="text-transparent bg-gradient-to-br from-pink-900 via-red-600 to-pink-900 bg-clip-text pb-2">
          Movie Database
        </span>
      </h1>
      <div className="flex items-center text-xl my-4">
        <Link href="/search">
          <button className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold p-4 px-12 rounded-full">
            Get Movies
          </button>
        </Link>
        <Link href="/charts">
          <button className="ml-4 bg-slate-500 hover:bg-slate-600 text-white font-bold p-4 px-12 rounded-full">
            View Charts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Body;
