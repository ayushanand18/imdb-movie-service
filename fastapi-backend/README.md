## API and DB Design

### Database Schema
> Tables
MovieCredits
    Movie_id: string;
    cast.cast_id: number;
    cast.character: string;
    cast.gender: number;
    cast.id: number;
    cast.name: string;
    crew.department: string;
    crew.gender: number;
    crew.job: string;
    crew.name: string;
Movie
    adult: boolean;
    budget: number;
    genres: text[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: text[];
    production_countries: text[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: text[];
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
Keywords:
	Movie_id: string;
    Keywords: text[];
Ratings
    movieId: number;
    rating: number;
    timestamp: number;
