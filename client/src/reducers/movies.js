export  default (movies = [], action) => {
 switch (action.type) {
  case 'FETCH_ALL':
    return action.payload;
  case 'CREATE':
    return movies;
  default:
    return movies;
 }

}
