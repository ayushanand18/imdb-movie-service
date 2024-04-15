"use client";
import React, { useState } from "react";
import Link from "next/link";

const Body: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<any[]>([]); // Assuming movies will be an array of objects

  const handleSearch = async () => {
    try {
      // Make an HTTP request to fetch movies based on the search term
      const response = await fetch(`API_ENDPOINT_HERE?search=${searchTerm}`);
      const data = await response.json();
      setMovies(data.results); // Assuming the API response has a 'results' array containing movie data
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen body">
      <h1 className="text-[5em] leading-[1.2em] shadow-xl backdrop-blur p-4 font-extrabold my-12 mt-40 text-white">
        Welcome To Our <br />
        Movie Database
      </h1>
      <div className="flex items-center text-xl my-4">
        <Link href="/search">
          <button
            onClick={handleSearch}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold p-4 px-12 rounded-full"
          >
            Get Movies
          </button>
        </Link>
        <Link href="/charts">
          <button
            onClick={handleSearch}
            className="ml-4 bg-slate-500 hover:bg-slate-600 text-white font-bold p-4 px-12 rounded-full"
          >
            View Charts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Body;
