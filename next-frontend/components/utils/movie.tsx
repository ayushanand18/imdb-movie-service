// components/MovieComponent.tsx
import React from 'react';

export interface Movie {
  overview: string;
  timestamp: string;
  adult: boolean;
  budget: number;
  genres: string;
  homepage: string | undefined;
  imdb_id: Text;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  production_companies: string;
  production_countries: string;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_language: string;
  status: string;
  tagline: string | undefined;
  title: string | undefined;
  vote_average: number;
  vote_count: number;
  movie_id: number;
}

export interface MovieComponentProps {
  movie: Movie;
}

export const MovieComponent: React.FC<MovieComponentProps> = ({ movie }) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.timestamp}</p>
      {/* Add more details you want to display */}
    </div>
  );
};
