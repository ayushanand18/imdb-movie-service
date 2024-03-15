from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .utils import FilteredMoviesResponse, MovieFilterParams

app = FastAPI()

# CORS Settings
origins = [
    "http://localhost",
    "http://localhost:3080",
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
    
    # Implement your filtering logic based on the received parameters
    filtered_movies = []
    
    return {"filtered_movies": filtered_movies}