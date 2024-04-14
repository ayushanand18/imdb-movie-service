"use client"
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
      <h1 className="text-5xl font-bold mb-8 mt-40 text-white">
        Welcome to our movie database
      </h1>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:border-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 15l4.5 4.5M7 13l-4.5 4.5M17 7l4.5-4.5M7 7l-4.5-4.5"
              />
            </svg>
          </span>
        </div>
        <button
          onClick={handleSearch}
          className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Get Movies
        </button>
      </div>

      {/* Display movies */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Search Results:</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Body;
