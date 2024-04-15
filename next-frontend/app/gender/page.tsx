// pages/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import { Chart } from "chart.js/auto";
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

interface GenderData {
  female_crew_count: number;
  total_crew_count: number;
  release_date: string;
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

  const [movies, setMovies] = useState<GenderData[]>([]);

  const renderChart = (data: GenderData[]) => {
    // Extract timestamps and values for entity1
    const entityTimestamps = data.map(
      (item) => new Date(item.release_date.split("-").reverse().join("-"))
    );
    const entityFemaleValues = data.map((item) => item.female_crew_count);
    const entityTotalValues = data.map((item) => item.total_crew_count);

    const chartData = {
      labels: entityTimestamps,
      datasets: [
        {
          label: "female",
          data: entityFemaleValues,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
        {
          label: "total",
          data: entityTotalValues,
          borderColor: "rgba(99, 255, 132, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    };

    // Example chart options
    const chartOptions = {
      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    // Get canvas elements
    const ctx = document.getElementById("chart1") as HTMLCanvasElement;

    // Destroy existing charts if they exist
    if (ctx) {
      const existingChart1 = Chart.getChart(ctx);
      if (existingChart1) {
        existingChart1.destroy();
      }
    }

    // Render the chart
    new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });
  };

  useEffect(() => {
    if (movies.length) {
      renderChart(movies);
    }
  }, [movies]);

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
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/analyse-gender`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
      if (!response.ok) throw Error("Error");
      const data = await response.json();

      setMovies(data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <main className="dark min-h-screen bg-black text-white w-screen flex flex-col">
      <Navbar />

      <div className="dark h-full dark bg-black w-full text-white flex flex-col max-w-7xl mx-auto">
        <h1 className="font-bold py-8 text-5xl dark">Analyse Gender Ratio</h1>
        <form onSubmit={handleSubmit} className="flex py-6">
          <Input
            type="text"
            value={filters.term}
            onChange={(e) =>
              setFilters((filters) => ({ ...filters, term: e.target.value }))
            }
            placeholder="Search for movies..."
            className="mr-2 px-2 py-1 border border-slate-400 rounded max-w-lg"
          />

          <Button
            type="submit"
            className="px-4 py-2 bg-green-500 mx-2 text-white rounded hover:bg-green-600"
          >
            Analyse Gender Ratio
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
        <div className="flex flex-row items-center justify-center dark:bg-gray-900 gap-6 py-6">
          <div className="max-w-2xl p-6 w-[36em] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <canvas id="chart1" className="mt-4 w-full"></canvas>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
