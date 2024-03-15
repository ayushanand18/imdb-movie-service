# Installation

## Steps
* `git clone https://github.com/ayushanand18/imdb-movie-service`
* `cd imdb-movie-service`

## Frontend
* `cd next-frontend`
* `npm install`

## Backend
* `pip install -r requirements`
    Or if you use a `venv`, first do `source .venv/bin/activate` and then, `pip install -r requirements.txt`

# Running
## Backend
* `cd fastapi-backend/`
* `uvicorn src.main:app --host 0.0.0.0 --port 8080`, I always run the backend on 8080 (HTTPS) - that's my personal pref, but you can change this anytime.

## Frontend
* `cd next-frontend`
* `npm run start`, It will boot up on port 3000 by default you can change that but make sure to whitelist that in backend for CORS.