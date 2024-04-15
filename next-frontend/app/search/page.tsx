// pages/index.tsx
"use client";
import React, { useState } from "react";
import { Movie, MovieComponent } from "@/components/utils/movie";
import Select, { MultiValue } from "react-select";
import Navbar from "../Navbar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { actors, directors, genres, languages } from "./constants";

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
    genre: [],
    ratings: [0, 10],
    language: [],
    vote_average: [0, 10],
    actors: [],
    director: [],
    term: "",
  });

  const [movies, setMovies] = useState<Movie[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (
    selectedOptions: MultiValue<{
      value: string;
      label: string;
    }>,
    name: keyof MovieFilters
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Array.from(selectedOptions.values()).map((val) => val.value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/movie-filter`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
      if (!response.ok) throw Error("Error");
      const data = await response.json();

      setMovies(data.filtered_movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <main className="h-screen bg-black text-white w-screen flex flex-col">
      <Navbar />

      <div className="h-full bg-black w-full text-white flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Movie Search</h1>
        <form onSubmit={handleSubmit} className="flex">
          <Input
            type="text"
            value={filters.term}
            onChange={(e) =>
              setFilters((filters) => ({ ...filters, term: e.target.value }))
            }
            placeholder="Search for movies..."
            className="mr-2 px-2 py-1 rounded text-black"
          />
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </Button>
          <Sheet>
            <SheetTrigger className="px-4 py-2 bg-gray-500 text-white rounded ml-2">
              Advanced Filter
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <span className="font-bold text-lg">Advanced Filters</span>
                <SheetDescription className="flex flex-col gap-y-4">
                  <div>
                    <label htmlFor="director">Director:</label>
                    <Select
                      id="director"
                      name="director"
                      isMulti
                      options={directors}
                      onChange={(selectedOptions) =>
                        handleMultiSelectChange(selectedOptions, "director")
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="language">Language:</label>
                    <Select
                      id="language"
                      name="language"
                      isMulti
                      options={languages}
                      onChange={(selectedOptions) =>
                        handleMultiSelectChange(selectedOptions, "language")
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="actors">Actors:</label>
                    <Select
                      id="actors"
                      name="actors"
                      isMulti
                      options={actors}
                      onChange={(selectedOptions) =>
                        handleMultiSelectChange(selectedOptions, "actors")
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="genre">Genre:</label>
                    <Select
                      id="genre"
                      name="genre"
                      isMulti
                      options={genres}
                      onChange={(selectedOptions) =>
                        handleMultiSelectChange(selectedOptions, "genre")
                      }
                    />
                  </div>
                  <div>
                    Ratings:
                    <Input
                      placeholder="min"
                      type="number"
                      id="minRating"
                      name="minRating"
                      value={filters.ratings[0] || ""}
                      onChange={(e) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          ratings: [
                            parseInt(e.target.value),
                            prevFilters.ratings[1],
                          ],
                        }))
                      }
                    />
                    <Input
                      placeholder="max"
                      type="number"
                      id="highRating"
                      name="highRating"
                      value={filters.ratings[1] || ""}
                      onChange={(e) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          ratings: [
                            prevFilters.ratings[0],
                            parseInt(e.target.value),
                          ],
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="vote_average">Average Vote:</label>
                    <Input
                      placeholder="Low"
                      type="number"
                      id="lowRating"
                      name="lowRating"
                      value={filters.vote_average[0] || ""}
                      onChange={(e) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          vote_average: [
                            parseInt(e.target.value),
                            prevFilters.vote_average[1],
                          ],
                        }))
                      }
                    />
                    <Input
                      placeholder="High"
                      type="number"
                      id="highRating"
                      name="highRating"
                      value={filters.vote_average[1] || ""}
                      onChange={(e) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          vote_average: [
                            prevFilters.vote_average[0],
                            parseInt(e.target.value),
                          ],
                        }))
                      }
                    />
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </form>
        <div className="flex flex-col gap-y-4">
          {movies.map((movie, index) => (
            <MovieComponent key={index} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
