import React, { useState } from 'react';
import Select from 'react-select';
import { MovieFilters } from './types'; // Assuming you have the interface defined in types.ts

const initialFilters: MovieFilters = {
  genre: [],
  ratings: [null, null],
  language: [],
  vote_average: [null, null],
  actors: [],
  director: [],
  term: ''
};

const MovieFiltersForm: React.FC = () => {
  const [filters, setFilters] = useState<MovieFilters>(initialFilters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleMultiSelectChange = (selectedOptions: { value: string; label: string }[], name: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: selectedOptions.map(option => option.value)
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., pass filters to parent component
    console.log(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="term">Search Term:</label>
        <input 
          type="text" 
          id="term" 
          name="term" 
          value={filters.term} 
          onChange={handleInputChange} 
        />
      </div>
      <div>
        <label htmlFor="director">Director:</label>
        <Select
          id="director"
          name="director"
          isMulti
          options={[
            { value: 'director1', label: 'Director 1' },
            { value: 'director2', label: 'Director 2' },
            // Add more director options as needed
          ]}
          onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'director')}
        />
      </div>
      <div>
        <label htmlFor="lowRating">Low Rating:</label>
        <input 
          type="number" 
          id="lowRating" 
          name="lowRating" 
          value={filters.ratings[0] || ''} 
          onChange={(e) => setFilters(prevFilters => ({ ...prevFilters, ratings: [parseInt(e.target.value), prevFilters.ratings[1]] }))} 
        />
      </div>
      <div>
        <label htmlFor="highRating">High Rating:</label>
        <input 
          type="number" 
          id="highRating" 
          name="highRating" 
          value={filters.ratings[1] || ''} 
          onChange={(e) => setFilters(prevFilters => ({ ...prevFilters, ratings: [prevFilters.ratings[0], parseInt(e.target.value)] }))} 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieFiltersForm;
