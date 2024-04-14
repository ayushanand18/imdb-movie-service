// components/MovieComponent.tsx
import React from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Movie {
  overview: string;
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
  spoken_languages: string;
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
    <div className="dark flex flex-row rounded-lg border border-white shadow-lg p-4">
      <Image
        src={`https://image.tmdb.org/t/p/w150${movie.poster_path}`}
        height={40}
        width={100}
        alt="Image"
      />
      <div className="flex flex-col dark">
        <h2 className="font-bold text-lg py-2">{movie.title}</h2>
        <div className="text-sm text-slate-300">{movie.genres}</div>
        <div className="">Votes: {movie.vote_average}</div>
        <div className="max-w-md py-4">{movie.overview}</div>
        <Dialog>
          <DialogTrigger className="dark">More Details</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>More Information</DialogTitle>
              <DialogDescription className="overflow-y-scroll max-h-[24em]">
                <Table className="overflow-y-scroll max-h-screen">
                  <TableCaption></TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Key</TableHead>
                      <TableHead className="">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="overflow-y-scroll max-h-screen flex-wrap">
                    {Object.keys(movie).map((key, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{key}</TableCell>
                        <TableCell>{(movie as any)[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
