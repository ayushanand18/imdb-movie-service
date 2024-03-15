from typing import List, Tuple
from pydantic import BaseModel, Field

class Movie(BaseModel):
    title: str
    year: int
    # Add more attributes as per your movie data model

class MovieFilterParams(BaseModel):
    genre: List[str]
    ratings: Tuple[float, float]
    language: List[str]
    vote_average: Tuple[float, float]
    actors: List[str]
    director: List[str]

class FilteredMoviesResponse(BaseModel):
    filtered_movies: List[Movie]