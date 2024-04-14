// pages/index.tsx
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Movie, MovieComponent } from '@/components/utils/movie';

interface MovieFilters {
  genre: string[];
  ratings: [number | null, number | null];
  language: string[];
  vote_average: (number | null)[];
  actors: string[];
  director: string[];
  term: string;
}

const IndexPage: React.FC = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    genre: [''],
    ratings: [null, null],
    language: [''],
    vote_average: [null],
    actors: [''],
    director: [''],
    term: '',
  });

  
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<Movie[]>(
        'https://imdb-movie-service.onrender.com/movie-filter',
        filters
      );
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={filters.term} 
          onChange={(e) => setFilters((filters) => ({...filters, term:e.target.value}))} 
          placeholder="Search for movies..." 
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {movies.map((movie, index) => (
          <MovieComponent key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
