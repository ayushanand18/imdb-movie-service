from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

from .utils import ActorComparisonData, ComparisonResponse, DirectorComparisonData, FilteredMoviesResponse, GenderAnalysisResponse, MovieComparisonData, MovieFilterParams, ProductionHouseComparisonData

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

@app.post("/compare-actors", response_model=ComparisonResponse)
async def compare_actors(params: ActorComparisonData):
    """
    Compare movies of two actors based on vote_average and popularity.

    Args:
        params (ActorComparisonData): The data containing actors to compare and mode of comparison.

    Returns:
        ComparisonResponse: Response containing comparison data.
    """
    actors = params.actors
    
    # Assuming only two actors are being compared
    if len(actors) != 2:
        return {"data": []}  # Return empty list if not exactly two actors are provided
    
    mode = params.mode
    
    # Initialize connection and cursor to None
    conn = None
    cur = None
    
    try:
        # Connect to PostgreSQL database
        conn = psycopg2.connect(
            host=SUPABASE_HOST,
            database=SUPABASE_DATABASE,
            user=SUPABASE_USER,
            password=SUPABASE_PASSWORD
        )
        
        # Create a cursor object
        cur = conn.cursor()
        
        # Fetch movies for each actor and their respective vote averages, popularity, and release dates
        actor_movies_data = []
        for actor in actors:
            cur.execute("""
                SELECT mc.movie_id, m.title, m.vote_average, m.popularity, m.release_date
                FROM MovieCredits mc
                JOIN Movie m ON mc.movie_id = m.id
                WHERE mc.cast.name = %s
            """, (actor,))
            
            rows = cur.fetchall()
            for row in rows:
                movie_id, title, vote_average, popularity, release_date = row
                actor_movies_data.append({
                    "movie_id": movie_id,
                    "timestamp": release_date,  # Use release date as timestamp
                    "movie_name": title,
                    "vote_average": vote_average,
                    "popularity": popularity
                })
        
        # Compare movies based on vote_average and popularity
        comparison_results = []
        for movie_data in actor_movies_data:
            comparison_value = abs(movie_data["vote_average"] - actor_movies_data[1]["vote_average"])
            comparison_results.append({
                "timestamp": movie_data["timestamp"],  # Include timestamp
                "movie_name": movie_data["movie_name"],
                "value": comparison_value
            })
            
            comparison_value = abs(movie_data["popularity"] - actor_movies_data[1]["popularity"])
            comparison_results.append({
                "timestamp": movie_data["timestamp"],  # Include timestamp
                "movie_name": movie_data["movie_name"],
                "value": comparison_value
            })
        
        return {"data": comparison_results}
    
    except psycopg2.DatabaseError as e:
        # Rollback any pending transaction
        conn.rollback()
        print(f"Database Error: {e}")
        return {"data": []}  # Return empty list on error
    
    finally:
        # Close cursor and connection
        if cur:
            cur.close()
        if conn:
            conn.close()

@app.post("/compare-directors", response_model=ComparisonResponse)
async def compare_directors(params: DirectorComparisonData):
    """
    Compare movies of two directors based on vote_average and popularity.

    Args:
        params (DirectorComparisonData): The data containing directors to compare and mode of comparison.

    Returns:
        ComparisonResponse: Response containing comparison data.
    """
    directors = params.directors
    mode = params.mode
    
    # Initialize connection and cursor to None
    conn = None
    cur = None
    
    try:
        # Connect to PostgreSQL database
        conn = psycopg2.connect(
            host=SUPABASE_HOST,
            database=SUPABASE_DATABASE,
            user=SUPABASE_USER,
            password=SUPABASE_PASSWORD
        )
        
        # Create a cursor object
        cur = conn.cursor()
        
        # Fetch movies for each director and their respective vote averages, popularity, and release dates
        director_movies_data = []
        for director in directors:
            cur.execute("""
                SELECT mc.movie_id, m.title, m.vote_average, m.popularity, m.release_date
                FROM MovieCredits mc
                JOIN Movie m ON mc.movie_id = m.id
                WHERE mc.crew.name = %s AND mc.crew.job = 'director'
            """, (director,))
            
            rows = cur.fetchall()
            for row in rows:
                movie_id, title, vote_average, popularity, release_date = row
                director_movies_data.append({
                    "movie_id": movie_id,
                    "movie_name": title,
                    "vote_average": vote_average,
                    "popularity": popularity,
                    "release_date": release_date
                })
        
        # Compare movies based on vote_average, popularity, and release date
        comparison_results = []
        for movie_data in director_movies_data:
            comparison_value = abs(movie_data["vote_average"] - director_movies_data[1]["vote_average"])
            comparison_results.append({
                "timestamp": movie_data["release_date"],  # Add release date as timestamp
                "movie_name": movie_data["movie_name"],
                "value": comparison_value
            })
            
            comparison_value = abs(movie_data["popularity"] - director_movies_data[1]["popularity"])
            comparison_results.append({
                "timestamp": movie_data["release_date"],  # Add release date as timestamp
                "movie_name": movie_data["movie_name"],
                "value": comparison_value
            })
        
        return {"data": comparison_results}
    
    except psycopg2.DatabaseError as e:
        # Rollback any pending transaction
        conn.rollback()
        print(f"Database Error: {e}")
        return {"data": []}  # Return empty list on error
    
    finally:
        # Close cursor and connection
        if cur:
            cur.close()
        if conn:
            conn.close()


@app.post("/compare-production-houses", response_model=ComparisonResponse)
async def compare_production_houses(params: ProductionHouseComparisonData):
    """
    Compare movies of two production houses based on vote_average and popularity.

    Args:
        params (ProductionHouseComparisonData): The data containing production houses to compare and mode of comparison.

    Returns:
        ComparisonResponse: Response containing comparison data.
    """
    prod_houses = params.production_houses
    mode = params.mode
    
    # Initialize connection and cursor to None
    conn = None
    cur = None
    
    try:
        # Connect to PostgreSQL database
        conn = psycopg2.connect(
            host=SUPABASE_HOST,
            database=SUPABASE_DATABASE,
            user=SUPABASE_USER,
            password=SUPABASE_PASSWORD
        )
        
        # Create a cursor object
        cur = conn.cursor()
        
        # Fetch movies for each production house and their respective vote averages, popularity, and release dates
        production_house_movies_data = []
        for prod_house in prod_houses:
            cur.execute("""
                SELECT mc.movie_id, m.title, m.vote_average, m.popularity, m.release_date
                FROM MovieCredits mc
                JOIN Movie m ON mc.movie_id = m.id
                WHERE m.production_companies @> %s::text[]
            """, ([prod_house],))
            
            rows = cur.fetchall()
            for row in rows:
                movie_id, title, vote_average, popularity, release_date = row
                production_house_movies_data.append({
                    "movie_id": movie_id,
                    "movie_name": title,
                    "vote_average": vote_average,
                    "popularity": popularity,
                    "release_date": release_date
                })
        
        # Compare movies based on vote_average, popularity, and release date
        comparison_results = []
        for movie_data in production_house_movies_data:
            comparison_value = abs(movie_data["vote_average"] - production_house_movies_data[1]["vote_average"])
            comparison_results.append({
                "timestamp": movie_data["release_date"],  # Add release date as timestamp
                "movie_name": movie_data["movie_name"],
                "value": comparison_value
            })
            
            comparison_value = abs(movie_data["popularity"] - production_house_movies_data[1]["popularity"])
            comparison_results.append({
                "timestamp": movie_data["release_date"],  # Add release date as timestamp
                "movie_name": movie_data["movie_name"],
                "value": comparison_value
            })
        
        return {"data": comparison_results}
    
    except psycopg2.DatabaseError as e:
        # Rollback any pending transaction
        conn.rollback()
        print(f"Database Error: {e}")
        return {"data": []}  # Return empty list on error
    
    finally:
        # Close cursor and connection
        if cur:
            cur.close()
        if conn:
            conn.close()

@app.post("/analyse-gender", response_model=GenderAnalysisResponse)
async def analyse_gender(params: MovieFilterParams):
    """
    Analyze gender ratio of actors in movies over time.

    Args:
        params (MovieFilterParams): The parameters for filtering movies.

    Returns:
        GenderAnalysisResponse: Response containing gender analysis data.
    """
    genre = params.genre
    ratings = params.ratings
    language = params.language
    vote_average = params.vote_average
    actors = params.actors
    director = params.director
    
    # Initialize connection and cursor to None
    conn = None
    cur = None
    
    try:
        # Connect to PostgreSQL database
        conn = psycopg2.connect(
            host=SUPABASE_HOST,
            database=SUPABASE_DATABASE,
            user=SUPABASE_USER,
            password=SUPABASE_PASSWORD
        )
        
        # Create a cursor object
        cur = conn.cursor()
        
        # Construct the SQL query to fetch movie data based on the provided parameters
        query = """
            SELECT m.release_date, 
                   SUM(CASE WHEN c.gender = 2 THEN 1 ELSE 0 END) AS female_crew_count,
                   COUNT(c.*) AS total_crew_count,
                   (SELECT json_agg(m) FROM Movie m WHERE m.id = mc.movie_id) AS movie
            FROM Movie m
            JOIN MovieCredits mc ON m.id = mc.movie_id
            JOIN CrewMember c ON mc.crew_id = c.credit_id
            WHERE 1 = 1
        """
        
        # Add filters based on parameters
        if genre:
            query += f" AND '{genre}' = ANY(m.genres)"
        if ratings:
            query += f" AND m.vote_average >= {ratings}"
        if language:
            query += f" AND '{language}' = ANY(m.spoken_languages)"
        if vote_average:
            query += f" AND m.vote_average >= {vote_average}"
        if actors:
            for actor in actors:
                query += f" AND '{actor}' = ANY(STRING_TO_ARRAY(c.name, ','))"
        if director:
            query += f" AND '{director}' = ANY(STRING_TO_ARRAY(mc.crew->>'name', ','))"
            
        query += " GROUP BY m.release_date ORDER BY m.release_date"
        
        # Execute the query
        cur.execute(query)
        rows = cur.fetchall()
        
        # Parse the results
        gender_analysis_data = []
        for row in rows:
            release_date, female_crew_count, total_crew_count, movie_json = row
            movie = json.loads(movie_json)
            gender_data = GenderData(
                female_crew_count=female_crew_count,
                total_crew_count=total_crew_count,
                movie=movie
            )
            gender_analysis_data.append(gender_data)
        
        return {"movies": gender_analysis_data}
    
    except psycopg2.DatabaseError as e:
        # Rollback any pending transaction
        conn.rollback()
        print(f"Database Error: {e}")
        return {"movies": []}  # Return empty list on error
    
    finally:
        # Close cursor and connection
        if cur:
            cur.close()
        if conn:
            conn.close()
