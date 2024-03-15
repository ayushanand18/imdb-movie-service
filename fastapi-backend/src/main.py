from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .utils import ActorComparisonResponse, FilteredMoviesResponse, MovieComparisonData, MovieFilterParams, ActorComparisonData

app = FastAPI()

# CORS Settings
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}


@app.post("/movie-filter", response_model=FilteredMoviesResponse)
async def filter_movies(params: MovieFilterParams):
    genre = params.genre
    ratings = params.ratings
    language = params.language
    vote_average = params.vote_average
    actors = params.actors
    director = params.director
    
    # TODO: Implement that SQL Query for fetching movie data per the params
    filtered_movies = []
    
    return {"filtered_movies": filtered_movies}

@app.post("/compare-actors", response_model=ActorComparisonResponse)
async def compare_actors(params: ActorComparisonData):
    actors = params.actors
    mode = params.mode
    
    # TODO: Implement that SQL Query for comparing actors
    result: List[MovieComparisonData] = []
    
    return {"data": result}