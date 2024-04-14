from typing import List, Tuple, Literal, Optional
from pydantic import BaseModel, Field

class Movie(BaseModel):
    overview: str
    release_date: Optional[str]
    adult: bool
    budget: int
    genres: Optional[str]
    homepage: Optional[str]
    imdb_id: str
    original_language: str
    original_title: str
    popularity: float
    poster_path: str
    production_companies: Optional[str]
    production_countries: Optional[str]
    release_date: str
    revenue: int
    runtime: int
    spoken_languages: Optional[str]
    status: str
    tagline: Optional[str]
    title: Optional[str]
    vote_average: float
    vote_count: int
    movie_id: int

class MovieFilterParams(BaseModel):
    genre: List[str]
    ratings: Tuple[float, float]
    language: List[str]
    vote_average: Tuple[float, float]
    actors: List[str]
    director: List[str]
    term: str

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

class GenderData(BaseModel):
    female_crew_count: int
    total_crew_count: int
    movie: Movie

class GenderAnalysisResponse(BaseModel):
    movies: List[GenderData]