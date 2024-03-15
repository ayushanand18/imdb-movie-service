from typing import List, Tuple, Literal
from pydantic import BaseModel, Field

class Movie(BaseModel):
    title: str
    timestamp: int
    popularity: float
    # Add more attributes

class MovieFilterParams(BaseModel):
    genre: List[str]
    ratings: Tuple[float, float]
    language: List[str]
    vote_average: Tuple[float, float]
    actors: List[str]
    director: List[str]

class FilteredMoviesResponse(BaseModel):
    filtered_movies: List[Movie]

class MovieComparisonData(BaseModel):
    timestamp: int
    movie_name: str
    value: float

class ActorComparisonData(BaseModel):
    actors: Tuple[str, str]
    mode: Literal["popularity", "avg_vote"]
    
class ComparisonResponse(BaseModel):
    data: List[MovieComparisonData]

class DirectorComparisonData(BaseModel):
    directors: Tuple[str, str]
    mode: Literal["popularity", "avg_vote"]

class ProductionHouseComparisonData(BaseModel):
    production_houses: Tuple[str, str]
    mode: Literal["popularity", "avg_vote"]

class GenderData:
    female_crew_count: int
    total_crew_count: int
    movie: Movie

class GenderAnalysisResponse(BaseModel):
    movies: List[GenderData]