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
    language: Optional[List[str]]
    vote_average: Tuple[float, float]
    actors: List[str]
    director: List[str]
    term: str

class FilteredMoviesResponse(BaseModel):
    filtered_movies: List[Movie]

class ActorComparisonData(BaseModel):
    actors: Tuple[str, str]
    mode: Literal["popularity", "vote_average"]

class MovieComparisonData(BaseModel):
    release_date: str
    movie_name: str
    movie_id: str
    value: float

class ComparisonResponse(BaseModel):
    data: Tuple[List[MovieComparisonData], List[MovieComparisonData]]

class DirectorComparisonData(BaseModel):
    directors: Tuple[str, str]
    mode: Literal["popularity", "vote_average"]

class ProductionHouseComparisonData(BaseModel):
    productionhouses: Tuple[str, str]
    mode: Literal["popularity", "average_vote"]

class GenderData(BaseModel):
    female_crew_count: int
    total_crew_count: int
    release_date: str

class GenderAnalysisResponse(BaseModel):
    movies: List[GenderData]