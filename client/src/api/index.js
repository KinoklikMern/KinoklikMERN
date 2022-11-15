import axios from 'axios';

const url = 'http://localhost:8000/movies';

export const fetchMovies = () => axios.get(url);
