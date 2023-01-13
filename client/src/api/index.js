import axios from 'axios';

const url = `${process.env.REACT_APP_BACKEND_URL}/movies`;

export const fetchMovies = () => axios.get(url);
